import "./App.css";
import Histogram from "react-chart-histogram";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";

function Histo(props) {
  const { nodes, loading } = props;
  const google = [];

  if (loading === false) {
    google.push(["Alarm", "Count"]);
    nodes.forEach(element => {
      google.push([element["alarm"], element["count"]]);
    });
  }
  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={google}
        options={{
          title: "Most frequent alarms",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Count",
            minValue: 0
          },
          vAxis: {
            title: "Alarm ID"
          }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

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
        <Histo nodes={nodes} loading={loading} />
      </header>
    </div>
  );

  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
