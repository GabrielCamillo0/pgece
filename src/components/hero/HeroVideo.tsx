"use client";

import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const VIDEO_SRC = "/210884_medium.mp4";

/**
 * Vídeo de fundo da hero: fixo na viewport. Fica sempre visível; o conteúdo
 * das seções abaixo cobre o vídeo ao rolar.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
