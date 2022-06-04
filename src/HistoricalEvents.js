import React from "react";
import EventList from "./components/EventList";

import Container from 'react-bootstrap/Container';

const HistoricalEvents = () => {
  return (
    <Container fluid>
        <h1>Initial base for Historical Events App - this is a WIP</h1>
        <EventList />
    </Container>
  );
};

export default HistoricalEvents;
