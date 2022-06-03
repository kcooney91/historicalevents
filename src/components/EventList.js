import React, { useEffect, useState } from "react";
import fetchAPI from "./Functional/fetchAPI";
import Table from 'react-bootstrap/Table';

const EventList = ( ) => {
  useEffect(() => { fetchAPI(fetchMoreEvents) }, [])
  const [events, setEvents] = useState([]);
  function fetchMoreEvents(data) {
    setEvents(events => [...events, ...data])   
  }
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Event Date</th>
            <th>Event Description</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, index) => (
            <tr key={index}>
                <td>{ev.date}</td>
                <td>{ev.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default EventList;
