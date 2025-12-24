import { useEffect } from "react";
import { useExam } from "../hooks/useExam";
import "../styles/exam.css";
import {useNavigate} from 'react-router-dom'
import CameraPreview from "../components/CameraPreview";
const QUESTIONS = [
  { id: "q1", text: "What is React?" },
  { id: "q2", text: "What is a Promise?" },
  { id: "q3", text: "Explain useMemo." },
];

export default function Exam() {
  const { answers, updateAnswer, status,violations,connection } = useExam("exam-123");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!document.fullscreenElement) {
      navigate("/");
    }
  }, []);

  return (
    <>
    <div
  className="exam"
  onCopy={(e) => e.preventDefault()}
  onPaste={(e) => e.preventDefault()}
  onContextMenu={(e) => e.preventDefault()}
  onKeyDown={(e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
}}
tabIndex={0}

>

      <h1>BDU Online Exam</h1>
<div className="flex-container">
<p className={`status ${status}`}>{status}</p>
      <p className={`connection ${connection}`}>{connection}</p>

</div>
{violations>0&&<p className="violations">Violations: {violations}</p>}

      {QUESTIONS.map((q) => (
        <div key={q.id} className="question">
          <p>{q.text}</p>
          <input
            value={answers[q.id] || ""}
            onChange={(e) => updateAnswer(q.id, e.target.value)}
          />
        </div>
      ))}
    </div>
    <CameraPreview/>
    </>
  );
}
