import { useEffect } from "react";
import { useExam } from "../hooks/useExam";
import "../styles/exam.css";
import {useNavigate} from 'react-router-dom'
import CameraPreview from "../components/CameraPreview";

const QUESTIONS = [
  { 
    id: "q1", 
    type: "short", 
    text: "Explain the difference between functional and object-oriented programming." 
  },
  { 
    id: "q2", 
    type: "choice", 
    text: "Which software development model emphasizes iterative delivery?", 
    options: ["Waterfall", "Agile", "V-Model", "Spiral"] 
  },
  { 
    id: "q3", 
    type: "short", 
    text: "What are the main challenges in scaling distributed systems?" 
  },
  { 
    id: "q4", 
    type: "choice", 
    text: "Which of the following is NOT a SOLID principle?", 
    options: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Concurrency"] 
  },
  { 
    id: "q5", 
    type: "short", 
    text: "Explain the purpose of unit testing and how it differs from integration testing." 
  },
];


export default function Exam() {
  const { answers, updateAnswer, status,violations,connection } = useExam("exam-123");
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (!document.fullscreenElement) {
  //     navigate("/");
  //   }
  // }, []);

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

            {q.type === "short" ? (
              <input
                type="text"
                value={answers[q.id] || ""}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
              />
            ) : (
              <div className="option-container">
             {   q?.options?.map((opt) => (
                  <label key={opt} className="choice-option">
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}

              </div>
            )}
          </div>
        ))}
    </div>
    <CameraPreview/>
    </>
  );
}
