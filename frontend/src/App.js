import { Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
