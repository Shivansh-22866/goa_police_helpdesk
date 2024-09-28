import { useEffect, useState } from 'react';

const useLibreTranslate = (sourceText, targetLanguage) => {
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const translateText = async () => {
      if (!sourceText.trim()) {
        setTranslatedText('');
        return;
      }

      try {
        const response = await fetch('https://libretranslate.com/translate', {
          method: 'POST',
          body: JSON.stringify({
            q: sourceText,
            source: 'auto',
            target: targetLanguage,
            format: 'text',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Translation request failed');
        }

        const data = await response.json();
        setTranslatedText(data.translatedText);
        setError(null);
      } catch (err) {
        console.error('Error translating text:', err);
        setError('Failed to translate text. Please try again.');
      }
    };

    const debounceTimer = setTimeout(() => {
      translateText();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [sourceText, targetLanguage]);

  return translatedText;
};

export default useLibreTranslate;