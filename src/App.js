import React from "react";
import HomePage from "./pages/Homepage";
import Shop from "./pages/Shop";
import "./App.css";
import { Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    );
  }
}

export default App;
