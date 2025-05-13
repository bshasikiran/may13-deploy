// This script helps to enable autoplay by creating a user interaction event at page load
// It runs as early as possible to unlock audio playback
(function() {
  // Create a temporary audio context and "touch" it immediately
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  if (window.AudioContext) {
    const context = new AudioContext();
    // Resume the audio context (this counts as user interaction in some browsers)
    if (context.state === 'suspended') {
      const resumeAudio = function() {
        context.resume();
        // Try to autoplay any audio elements
        document.querySelectorAll('audio').forEach(audio => {
          audio.play().catch(() => {});
        });
      };
      
      // Execute immediately
      resumeAudio();
      
      // Execute again on any user interaction
      ['touchstart', 'touchend', 'mousedown', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, resumeAudio, { once: true });
      });
    }
  }
})();