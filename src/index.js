import React from "react";
import { createRoot } from 'react-dom/client';
import HistoricalEvents from "./HistoricalEvents";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HistoricalEvents/>);