const decoder = new TextDecoder();

function processChunkedResponse(response, callback) {
    const check = new RegExp("\"event\": {(.*?)\"}", "g");
    let result;
    if(!response.body){
        return "body empty";
    }
    const reader = response.body.getReader();
    let parsedData = [];
    reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
        if (done) {
            console.log("all data loaded");
            callback(parsedData); //return last chunk of events
            return parsedData;
        }

        // value for fetch streams is a Uint8Array
        result += decoder.decode(value);
    
        //Match all events in this chunk, add remaining text to param so half events are picked up in the next round.
        //We should really sanitize the data too to remove Wiki specific markup language
        result = result.replace(
            check,
            function (fullStringMatch, regexWildcard) {
                let singleEvent = JSON.parse("{" + regexWildcard + "\"}");
                singleEvent.description = singleEvent.description.replace(
                    /<a href="(.*?)">(.*?)<\/a>/g,
                    "<a href=\"$1\">EXTERNAL LINK</a>"
                );
                singleEvent.description = singleEvent.description.replace(
                    /{{(.*?)}}/g,
                    ""
                );
                singleEvent.description = singleEvent.description.replace(
                    /ampamp/g,
                    " "
                );
                parsedData.push(singleEvent);
        
                //Send back the update so we can show it in the UI. Reduce rerenders by only updating when we have 1000 results
                if(parsedData.length === 1000){
                    callback(parsedData);
                    parsedData = [];
                }
            }
        );

    
        // Read the next stream chunk and process it
        return reader.read().then(processText);
    });
}

const fetchAPI = async (callback) => {
    try {
        fetch(
            "https://www.vizgr.org/historical-events/search.php?format=json&begin_date=-3000000&end_date=20151231&lang=en"
        )
            .then((response) => {
                processChunkedResponse(response, callback);
            })
            .then(() => {
                return;
            }).catch((e) => {
                callback(e.toString());
            });

    } catch (e) {
        throw "There is something wrong with the API:" + e;
    }
};

export default fetchAPI;
