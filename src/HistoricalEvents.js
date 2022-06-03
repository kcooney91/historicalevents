import React from "react";
import EventList from "./components/EventList";

const HistoricalEvents = () => {
  return (
    <>
      <section id="heading">
        <h1>Initial base for Historical Events App - this is a WIP</h1>
      </section>
      <section className="row">
        <EventList />
      </section>
    </>
  );
};

export default HistoricalEvents;
