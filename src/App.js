import React from "react";
import HomePage from "./pages/Homepage";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<Register />} />
        </Routes>
      </div>
    );
  }
}

export default App;
