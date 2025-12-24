import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartExam from "./pages/StartExam";
import Exam from "./pages/Exam";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<StartExam />} />
      <Route path="/exam" element={<Exam />} />
    </Routes>
    </Router>
  );
}

export default App;
