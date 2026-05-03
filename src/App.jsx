import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import ScoreCalculator from "./pages/ScoreCalculator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calc" element={<Calculator />} />
        <Route path="/score" element={<ScoreCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
