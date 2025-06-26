"use client";
import React, { useRef, useState } from "react";

export default function FaceVerification({ avatarUrl, onVerified }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");
  const [verified, setVerified] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  const startWebcam = async () => {
    setStatus("Starting webcam...");
    setProgress(10);
    setProgressLabel("Starting webcam");
    setVerified(null);
    setSnapshot(null);
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStatus("Webcam started");
      setProgress(30);
      setProgressLabel("Webcam started");
    } catch (e) {
      setStatus("Failed to start webcam");
      setProgress(0);
      setProgressLabel("");
    }
    setLoading(false);
  };

  const startCountdown = () => {
    setCountdown(3);
    setStatus("Get ready...");
    setProgress(40);
    setProgressLabel("Countdown");
    let count = 3;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        captureSnapshot();
      }
    }, 700);
  };

  const captureSnapshot = () => {
    setStatus("Capturing image...");
    setProgress(55);
    setProgressLabel("Capturing image");
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    setSnapshot(dataUrl);
    setStatus("Snapshot taken. Confirm to verify.");
    setProgress(60);
    setProgressLabel("Snapshot ready");
  };

  const retakeSnapshot = () => {
    setSnapshot(null);
    setStatus("Webcam ready");
    setProgress(30);
    setProgressLabel("Webcam started");
  };

  const confirmAndVerify = async () => {
    setStatus("Uploading and verifying...");
    setProgress(70);
    setProgressLabel("Uploading images");
    setLoading(true);
    // Fetch avatar as blob
    const avatarResp = await fetch(avatarUrl);
    const avatarBlob = await avatarResp.blob();
    // Convert snapshot dataUrl to blob
    const res = await fetch(snapshot);
    const snapshotBlob = await res.blob();
    const formData = new FormData();
    formData.append("avatar", avatarBlob, "avatar.jpg");
    formData.append("capture", snapshotBlob, "capture.jpg");
    setProgress(85);
    setProgressLabel("Verifying faces");
    const resp = await fetch("http://localhost:5000/api/verify-face", {
      method: "POST",
      body: formData,
    });
    const data = await resp.json();
    setVerified(data.verified);
    setStatus(data.verified ? "✅ Face verified!" : "❌ Face not verified");
    setProgress(100);
    setProgressLabel("Done");
    setLoading(false);
    if (data.verified && onVerified) onVerified();
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xs">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full transition-all duration-300 ${progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-700 mb-1 min-h-[1.2em]">{progressLabel}</div>
      {/* Countdown overlay */}
      <div className="relative">
        {snapshot ? (
          <img src={snapshot} alt="Snapshot preview" className="rounded border w-[220px] h-[180px] object-cover bg-black" />
        ) : (
          <video ref={videoRef} autoPlay width={220} height={180} className="rounded border bg-black" />
        )}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-6xl font-bold animate-pulse">
            {countdown === 0 ? "" : countdown}
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="flex gap-2 mt-2">
        {!snapshot && (
          <>
            <button
              onClick={startWebcam}
              disabled={loading || progress > 0 && progress < 100 || countdown !== null}
              className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Start Webcam
            </button>
            <button
              onClick={startCountdown}
              disabled={loading || progress < 30 || progress === 100 || countdown !== null}
              className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Verify Face
            </button>
          </>
        )}
        {snapshot && (
          <>
            <button
              onClick={confirmAndVerify}
              disabled={loading}
              className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Confirm & Verify
            </button>
            <button
              onClick={retakeSnapshot}
              disabled={loading}
              className="bg-yellow-500 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Retake
            </button>
          </>
        )}
      </div>
      <div className="mt-2 text-sm min-h-[1.5em]">{status}</div>
      {verified === true && (
        <div className="flex flex-col items-center mt-2">
          <div className="text-green-600 text-3xl animate-bounce">✔️</div>
          <div className="text-green-600 font-bold">Face Verified!</div>
        </div>
      )}
      {verified === false && (
        <div className="flex flex-col items-center mt-2">
          <div className="text-red-600 text-3xl">❌</div>
          <div className="text-red-600 font-bold">Not Verified</div>
        </div>
      )}
    </div>
  );
} 