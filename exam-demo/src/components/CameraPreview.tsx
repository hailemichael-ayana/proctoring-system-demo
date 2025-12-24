import { useEffect, useRef, useState } from "react";
import "./camera.css";

export default function CameraPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

const streamRef = useRef<MediaStream | null>(null);

useEffect(() => {
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Camera access denied");
    }
  }

  startCamera();

  return () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  };
}, []);


  if (error) {
    return <div className="camera-error">{error}</div>;
  }

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay muted />
      <span className="camera-label">Camera On</span>
    </div>
  );
}
