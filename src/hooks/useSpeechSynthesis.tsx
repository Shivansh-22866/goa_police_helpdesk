import { useEffect, useState } from "react";

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log("Available voices:", availableVoices); // Log available voices
      setVoices(availableVoices);
    };

    updateVoices(); // Load voices initially
    window.speechSynthesis.onvoiceschanged = updateVoices; // Update on voice changes

    return () => {
      window.speechSynthesis.onvoiceschanged = null; // Clean up
    };
  }, []);

  const handleAudioPlayback = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    if (text.trim() === '') {
      console.warn('No text to speak');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    // Select a voice
    const selectedVoice = voices.find(voice => voice.lang === 'en-US') || voices[0];
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.warn('No suitable voice found');
      alert('Speech synthesis is not available in your browser.'); // Alert user if no voice is found
      return; // Exit if no voice is available
    }

    console.log(text)
    console.log(utterance)


    utterance.onstart = () => {
      console.log('Speech has started');
    };

    utterance.onend = () => {
      console.log('Speech has finished');
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event);
    };

    window.speechSynthesis.speak(utterance);
  };

  return { handleAudioPlayback, voices };
};

export default useSpeechSynthesis;
