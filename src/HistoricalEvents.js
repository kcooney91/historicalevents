import React from "react";
import EventList from "./components/EventList";

import styles from "./HistoricalEvents.module.css";

const HistoricalEvents = () => {
    return (
        <>
            <h1 className={styles.heading}>Application that pulls in data from an API, displays it in a table to the user and allows them to search</h1>
            <EventList />
        </>
    );
};

export default HistoricalEvents;
