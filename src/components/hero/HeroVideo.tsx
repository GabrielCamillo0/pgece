"use client";

import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const VIDEO_SRC = "/210884_medium.mp4";

const FALLBACK_STYLE: React.CSSProperties = {
  background: [
    "radial-gradient(900px 560px at 5% 8%,  rgba(139,31,204,0.35), transparent 55%)",
    "radial-gradient(700px 500px at 72% 0%,  rgba(255,72,32,0.18),  transparent 55%)",
    "linear-gradient(180deg, #0d0020 0%, #08000e 55%, #05000a 100%)",
  ].join(","),
};

/**
 * Vídeo de fundo da hero: fixo na viewport. Fica sempre visível; o conteúdo
 * das seções abaixo cobre o vídeo ao rolar. Em produção, se o arquivo não
 * existir, mostra gradiente de fallback.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (typeof ReactDOM.preload === "function") {
      ReactDOM.preload(VIDEO_SRC, { as: "video", fetchPriority: "high" });
    } else if (typeof document !== "undefined" && !document.querySelector(`link[href="${VIDEO_SRC}"]`)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = VIDEO_SRC;
      link.as = "video";
      link.type = "video/mp4";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.55;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("loadeddata", play, { once: true });
    video.addEventListener("canplay", play, { once: true });
    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {videoError ? (
        <div className="absolute inset-0" style={FALLBACK_STYLE} />
      ) : (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 h-full w-full object-cover select-none"
          style={{
            transform: "translateZ(0)",
            opacity: 0.42,
            mixBlendMode: "screen",
          }}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onError={() => setVideoError(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
