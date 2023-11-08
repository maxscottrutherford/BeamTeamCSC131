import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video className='video-background' src="videos/video-2.mp4" autoPlay loop muted />
      <h1>AWESOMENESS AWAITS</h1>
      <p>what are you waiting for?</p>
    </div>
  );
}

export default HeroSection;
