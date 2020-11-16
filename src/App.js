import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";
import MostFreqAlarms from "./Components/MostFreqAlarms";
import NodesWithMostAlarms from "./Components/NodesWithMostAlarms";

function App() {
  const [nodes2, setNodes2] = useState([]);
  const [loading2, setLoading2] = useState(true);

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
        <MostFreqAlarms />
        <NodesWithMostAlarms nodes={nodes2} loading={loading2} />
      </header>
    </div>
  );

  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
