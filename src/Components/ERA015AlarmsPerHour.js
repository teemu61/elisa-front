import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";
import Chart from "react-google-charts";

function ERA015AlarmsPerHour() {
  const google = [];
  const [hour, setHour] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8082/hour").then(response => {
      setHour(response.data);
      setLoading(false);
    });
  }, []);

  if (loading === false) {
    google.push(["Date", ""]);
    hour.forEach(element => {
      var date = new Date(element["date"]);
      var years = date.getFullYear();
      var months = date.getMonth();
      var days = date.getDate();
      var hours = date.getHours();
      const dateObject = new Date(years, months, days, hours);
      google.push([dateObject, element["count"]]);
    });
  }

  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={google}
        options={{
          chart: {
            title: "ERA015 alarms per hour"
          },
          width: 500,
          height: 300,
          series: {
            // Gives each series an axis name that matches the Y-axis below.
            0: { axis: "Alarms" }
          },
          axes: {
            y: {
              Alarms: { label: "ERA015 alarms per hour" }
            }
          }
        }}
      />
    </div>
  );
}

export default ERA015AlarmsPerHour;
