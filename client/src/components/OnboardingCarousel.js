import React, { useState, useEffect, useRef } from 'react';
import './OnboardingCarousel.css';
import { useNavigate } from 'react-router-dom';

const slides = [
  { title: 'Welcome to Muyan', description: 'Your accessible city guide', bgColor: '#009688' },
  { title: 'Find Places Easily', description: 'Discover accessible spots around you', bgColor: '#3F51B5' },
  { title: 'Connect With Community', description: 'Join other users and share tips', bgColor: '#FF5722' },
];

export function OnboardingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const navigate = useNavigate(); // 

  // 
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current) {
        if (currentIndex < slides.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          clearInterval(interval);
          navigate("/login"); // ← الانتقال بعد نهاية الكاروسيل
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, navigate]);

  // وظائف السحب
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = startX.current - currentX;

    if (diff > 50 && currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      isDragging.current = false;
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="onboarding-container"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slides-wrapper"
        ref={slidesRef}
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="onboarding-slide"
            style={{ backgroundColor: slide.bgColor }}
          >
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>

      <div className="onboarding-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`onboarding-dot ${index === currentIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
