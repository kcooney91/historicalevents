const decoder = new TextDecoder();

function processChunkedResponse(response, callback) {
  const check = new RegExp('"event": {(.*?)"}', "g");
  let result;
  const reader = response.body.getReader();

  reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      return parsedData;
    }

    // value for fetch streams is a Uint8Array
    result += decoder.decode(value);

    let parsedData = [];
    //Match all events in this chunk, add remaining text to param so half events are picked up in the next round.
    result = result.replace(
      check,
      function (fullStringMatch, regexWildcard, length) {
        parsedData.push(JSON.parse("{" + regexWildcard + '"}'));
      }
    );

    //Send back the update so we can show it in the UI
    callback(parsedData);
    // Read the next stream chunk and process it
    return reader.read().then(processText);
  });
}

const fetchAPI = async (callback) => {
  const check = new RegExp('"event": {(.*?)"}', "g");
  let result;
  try {
    fetch(
      "https://www.vizgr.org/historical-events/search.php?format=json&begin_date=-3000000&end_date=20151231&lang=en&limit=100"
    ).then((response) => {
      processChunkedResponse(response, callback);
    })
    .then((response) => {
      return
    })
  } catch (e) {
    throw "There is something wrong with the API:" + e;
  }
};

export default fetchAPI;
