import { useEffect, useState, useRef } from "react";
import { loadAnswers, saveAnswers } from "../utils/storage";
import { syncAnswer } from "../api/mockExamApi";
import { useNavigate } from "react-router-dom";

export function useExam(examId: string) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>(
    () => loadAnswers(examId)
  );
  const [violations, setViolations] = useState(0);
  const [status, setStatus] = useState("synced with server");
  const [connection, setConnection] = useState(
    navigator.onLine ? "online" : "offline"
  );

  
  const pendingSync = useRef(false);

  function updateAnswer(qId: string, value: string) {
    const updated = { ...answers, [qId]: value };
    setAnswers(updated);
    saveAnswers(examId, updated);

    if (!navigator.onLine) {
      setConnection("offline");
      pendingSync.current = true; 
      setStatus("waiting for the Server")
      return;
    } else {
      setConnection("online");
    }

    
    pendingSync.current = false;
          setStatus("waiting for the server ")


    syncAnswer()
      .then(() => setStatus("synced with server"))
      .catch(() => {
        setConnection("offline");
        pendingSync.current = true; 
      });
  }

  
  useEffect(() => {
    function handleOnline() {
      setConnection("online");
      if (pendingSync.current) {
        setStatus("saving");
        syncAnswer()
          .then(() => {
            setStatus("synced with server");
            pendingSync.current = false;
          })
          .catch(() => {
            setConnection("offline");
            pendingSync.current = true;
            setStatus("waiting for the backend to be active ")

          });
      }
    }

    function handleOffline() {
      setConnection("offline");
      setStatus("waiting for the backend to be active ")

    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) setViolations((v) => v + 1);
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const threshold = 160;
    function detectDevTools() {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      if (widthDiff > threshold || heightDiff > threshold) {
        setViolations((v) => v + 1);
      }
    }
    window.addEventListener("resize", detectDevTools);
    return () => window.removeEventListener("resize", detectDevTools);
  }, []);

  useEffect(() => {
    if (violations >= 3) {
      alert("Too many violations. Exam will be submitted.");
      navigate("/");
      location.reload();
    }
  }, [violations]);

  useEffect(() => {
    function handleFullscreenExit() {
      if (!document.fullscreenElement) setViolations((v) => v + 1);
    }
    document.addEventListener("fullscreenchange", handleFullscreenExit);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
  }, []);

  return { answers, updateAnswer, status, violations, connection };
}
