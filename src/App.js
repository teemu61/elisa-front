import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";
import MostFreqAlarms from "./Components/MostFreqAlarms";
import NodesWithMostAlarms from "./Components/NodesWithMostAlarms";

function App() {
  const [nodes, setNodes] = useState([]);
  const [nodes2, setNodes2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8082/node").then(response => {
      setNodes(response.data);
      console.log("node from rest api: ", response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8082/freq").then(response => {
      setNodes2(response.data);
      console.log("freq from rest api: ", response.data);
      setLoading2(false);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <MostFreqAlarms nodes={nodes} loading={loading} />
        <NodesWithMostAlarms nodes={nodes2} loading={loading2} />
      </header>
    </div>
  );

  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
