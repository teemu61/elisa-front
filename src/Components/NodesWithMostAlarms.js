import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";

function NodesWithMostAlarms() {
  const [node, setNode] = useState([]);
  const [loading, setLoading] = useState(true);
  const google = [];

  useEffect(() => {
    axios.get("http://localhost:8082/node").then(response => {
      setNode(response.data);
      console.log("node from rest api: ", response.data);
      setLoading(false);
    });
  }, []);

  if (loading === false) {
    google.push(["Alarm", "Count"]);
    node.forEach(element => {
      google.push([element["node"], element["count"]]);
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
          title: "Nodes with most alarms",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Count",
            minValue: 0
          },
          vAxis: {
            title: "Node ID"
          }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default NodesWithMostAlarms;
