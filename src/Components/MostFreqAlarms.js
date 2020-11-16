import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";

function MostFreqAlarms() {
  const google = [];
  const [freq, setFreq] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8082/freq").then(response => {
      setFreq(response.data);
      console.log("freq from rest api: ", response.data);
      setLoading(false);
    });
  }, []);

  if (loading === false) {
    google.push(["Node ID", "Count"]);
    freq.forEach(element => {
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
      />
    </div>
  );
}

export default MostFreqAlarms;
