import { useNavigate } from "react-router-dom";
import "../styles/start.css";
import { useEffect } from "react";

export default function StartExam() {
  const navigate = useNavigate();

  function startExam() {
      document.documentElement.requestFullscreen();
  }
    

  useEffect(() => {
    function handleFullscreenChange() {
      if (document.fullscreenElement) {
        navigate("/exam");
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
  }, [navigate]);
  return (
    <div className="start">
      <h1>BDU Online Exam</h1>

      <ul>
        <li>Do not switch tabs or windows</li>
        <li>Do not exit fullscreen</li>
        <li>All actions are monitored</li>
        <li>Your answers are saved automatically</li>
      </ul>

      <button onClick={startExam}>Start Exam</button>
    </div>
  );
}
