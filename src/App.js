import React from "react";
import HomePage from "./components/Homepage";
import "./App.css";
import { Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
