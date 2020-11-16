import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";
import MostFreqAlarms from "./Components/MostFreqAlarms";
import NodesWithMostAlarms from "./Components/NodesWithMostAlarms";
import ERA015AlarmsPerHour from "./Components/ERA015AlarmsPerHour";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MostFreqAlarms />
        <br />
        <NodesWithMostAlarms />
        <br />
        <ERA015AlarmsPerHour />
      </header>
    </div>
  );

  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
