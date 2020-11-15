import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";
import MostFreqAlarms from "./Components/MostFreqAlarms";

function App() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:8082/node").then(response => {
      console.log("promise fulfilled");
      setNodes(response.data);
      setLoading(false);
    });
  }, []);
  console.log("render", nodes.length, "nodes");

  return (
    <div className="App">
      <header className="App-header">
        <MostFreqAlarms nodes={nodes} loading={loading} />
      </header>
    </div>
  );

  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
