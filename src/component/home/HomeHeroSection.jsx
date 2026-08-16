import React, { useState, useEffect, useRef } from "react";

const HomeHeroSection = () => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Force video to play when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(err => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, []);

  // Handle video load errors
  const handleVideoError = () => {
    console.error('Video failed to load');
    setVideoError(true);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 
        LAYER 1: Background Video (z-0)
      */}
      <div className="absolute inset-0 w-full h-full">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          style={{
            display: videoError ? 'none' : 'block',
          }}
        >
          <source src="/video/banner.mp4" type="video/mp4" />
          <source src="/video/banner.webm" type="video/webm" />
          <source src="/video/banner.ogg" type="video/ogg" />
        </video>

        {/* Fallback Gradient Background (visible when video fails) */}
        {videoError && (
          <div className="w-full h-full bg-gradient-to-br from-[#0B1220] via-[#0F1A2E] to-[#0F4C81]">
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-xl">Video failed to load. Please check the file path.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeHeroSection;