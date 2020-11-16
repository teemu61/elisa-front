import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";

function MostFreqAlarms(props) {
  const { nodes, loading } = props;
  const google = [];

  if (loading === false) {
    google.push(["Node ID", "Count"]);
    nodes.forEach(element => {
      google.push([element["node"], element["count"]]);
    });
  }

  console.log("most freq alarms: ", google);

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
      />
    </div>
  );
}

export default MostFreqAlarms;
