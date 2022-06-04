import React, { useEffect, useState } from "react";

import Search from "./Search";
import fetchAPI from "./Functional/fetchAPI";

import { Table, Container, Stack } from "react-bootstrap";

const EventList = () => {
  useEffect(() => {
    fetchAPI(fetchMoreEvents);
  }, []);
  const [events, setEvents] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState(false);

  function fetchMoreEvents(data) {
    if (typeof data === "string") {
      setError(data);
    } else {
      setEvents((events) => [...events, ...data]);
    }
  }

  const searchHandler = (search) => {
    setSearchField(search);
  };
  const filteredEvents = events.filter((events) => {
    return events.description.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <Stack gap={3}>
      <Search disabled={error} onUpdateSearch={searchHandler} />

      {error && <p>{error}</p>}

      {!error && events.length === 0 && (
        <p>We're just loading up the first ~2000 events</p>
      )}

      {!error && events.length > 0 && filteredEvents.length === 0 && (
        <p>Please refine your search!</p>
      )}

      {filteredEvents.length > 0 && (
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Event Date</th>
              <th>Event Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((ev, index) => (
              <tr key={index} id={index}>
                <td>{ev.date}</td>
                <td
                  style={{ wordBreak: "normal" }}
                  dangerouslySetInnerHTML={{ __html: ev.description }}
                />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Stack>
  );
};

export default EventList;
