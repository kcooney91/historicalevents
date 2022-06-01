import React from "react";



export async function fetchHandler(limit=1000, offset=0) {
    try {
        let response = await fetch(`https://www.vizgr.org/historical-events/search.php?format=json&begin_date=19001231&end_date=20151231&lang=en&limit=${limit}&offset=${offset}`);
        let data =  await response.json();
        console.log(data)
        return data;
    }
    catch (e) {
        return "There is something wrong with the API";
    }
    
}

const HistoricalEvents = () => {
    
    fetchHandler()

    return (
        <section id="heading">
            <h1>Initial base for Historical Events App - this is a WIP</h1>
        </section>
    )
}

export default HistoricalEvents;