import React, { useEffect, useState } from "react";

import Search from "../Search/Search";
import FetchAPI from "../../Functional/FetchAPI";

import styles from "./EventList.module.css";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [actualSearch, setActualSearch] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        FetchAPI(fetchMoreEvents);
        setIsLoadingEvents(true);
    }, []);

    function fetchMoreEvents(newEvents) {
        if (typeof newEvents === "string") {
            setError(true);
            setErrorMessage(newEvents);
        } else {
            setEvents((events) => [...events, ...newEvents]);
            if(newEvents.length < 1000){
                setIsLoadingEvents(false);
            }
        }
    }

    const searchHandler = (search) => {
        setSearchField(search);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setActualSearch(searchField);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchField]);

    return (
        <section id="events" className={styles.events}>

            {error && <p className={`${styles.userMessage} ${styles.userNotification}`}>OOPS, something went wrong. Please try refresh.<br/>{errorMessage}</p>}

            {!error && events.length === 0 && (
                <p className={styles.userMessage}>We are just loading up the first 1000 events</p>
            )}

            {!error && events.length > 0 && isLoadingEvents && (
                <p className={`${styles.userMessage} ${styles.userNotification}`}>We are still loading events but you can filter using the search bar below.</p>
            )}


            <Search onUpdateSearch={searchHandler} disabled={error} inputId="eventSearch" placeholder="e.g. Pilgrim"/>

            {events.length > 0 && (
                <table className={styles.eventsTable}>
                    <thead>
                        <tr>
                            <th className={styles.date}>Event Date</th>
                            <th className={styles.description}>Event Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, id) => {
                            if (actualSearch.length > 0) {
                                if (event.description.toLowerCase().includes(actualSearch.toLowerCase())) {
                                    return (
                                        <tr key={id}>
                                            <td className={styles.date}>{event.date}</td>
                                            <td className={styles.description} dangerouslySetInnerHTML={{__html: event.description}}></td>
                                        </tr>
                                    );
                                }
                            } else {
                                return (
                                    <tr key={id}>
                                        <td className={styles.date}>{event.date}</td>
                                        <td className={styles.description} dangerouslySetInnerHTML={{__html: event.description}}></td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default EventList;
