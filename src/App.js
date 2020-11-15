import "./App.css";
import Histogram from "react-chart-histogram";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { labeledStatement } from "@babel/types";

function Histo(props) {
  const { nodes, loading } = props;
  console.log("Histo called ", nodes);

  const labels = [];
  const data = [];

  if (loading === false) {
    nodes.forEach(element => {
      console.log("element: ", element);
      labels.push(element["alarm"]);
      data.push(element["count"]);
    });
  }

  console.log("lablels: ", labels);
  console.log("data: ", data);

  const labels2 = ["2016", "2017"];
  const data2 = [324, 45];
  console.log("data2: ", data2);
  const options = { fillColor: "#FFFFFF", strokeColor: "#0000FF" };

  return (
    <div>
      <Histogram
        xLabels={labels}
        yValues={data2}
        width="400"
        height="200"
        options={options}
      />
    </div>
  );
}

class RestComponent extends React.Component {
  componentDidMount() {
    axios.get("http://localhost:8082/node").then(response => {
      const nodes = response.data;
      console.log("data from rest api: ", nodes);
      <Histo nodes={nodes} />;
    });
  }
  render() {
    return <p>RestComponent render called</p>;
  }
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
        <p>App body teksti</p>
        <RestComponent />
        <Histo nodes={nodes} loading={loading} />
      </header>
    </div>
  );

  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
