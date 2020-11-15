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

export default MostFreqAlarms;
