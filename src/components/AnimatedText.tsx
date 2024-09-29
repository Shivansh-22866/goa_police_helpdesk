// components/AnimatedText.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const sentences: Record<'title' | 'subtitle', string[]> = {
  title: [
    "गोवा पोलीस मदत <span class='text-blue-800'>डेस्क</span>",
    "Goa Police Help <span class='text-blue-800'>Desk</span>",
    "गोंय पुलीस हेल्प <span class='text-blue-800'>डेस्क</span>",
    "ಗೋವಾ ಪೊಲೀಸ್ ಸಹಾಯ <span class='text-blue-800'>ಡೆಸ್ಕ್</span>",
    "गोवा पुलिस हेल्प <span class='text-blue-800'>डेस्क</span>"
  ],
  subtitle: [
    "तुमच्या सुरक्षिततेसाठी येथे. तुमच्या समर्थनासाठी येथे आहे.",
    "Here for your security, Here for your support",
    "तुमच्या सुरक्षे खातीर हांगा. तुमच्या आदाराक हांगा.",
    "ನಿಮ್ಮ ಸುರಕ್ಷತೆಗಾಗಿ ಇಲ್ಲಿ. ನಿಮ್ಮ ಬೆಂಬಲಕ್ಕಾಗಿ ಇಲ್ಲಿ.",
    "आपकी सुरक्षा के लिए. आपके समर्थन के लिए."
  ]
};

interface AnimatedTextProps {
  textType: 'title' | 'subtitle';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ textType }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const textArray = sentences[textType];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [textArray]);

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={textType === 'subtitle' ? "text-xl sm:text-2xl font-semibold text-neutral-400" : "text-4xl sm:text-7xl font-bold text-neutral-200"}
    >
      {/* Use `dangerouslySetInnerHTML` to render HTML for title */}
      {textType === 'title' ? (
        <span dangerouslySetInnerHTML={{ __html: textArray[currentIndex] }} />
      ) : (
        textArray[currentIndex]
      )}
    </motion.div>
  );
};

export default AnimatedText;
