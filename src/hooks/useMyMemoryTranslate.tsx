import { useEffect, useState } from 'react';

const useMyMemoryTranslate = (
    sourceText: string, 
    sourceLang: string = 'en', 
    targetLang: string = 'hi'
): { translatedText: string; error: string | null; isLoading: boolean } => {
    const [translatedText, setTranslatedText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log('useEffect triggered. Source Text:', sourceText, 'Source language:', sourceLang, 'Target:', targetLang);

        const translateText = async (retryCount: number = 0) => {
            if (!sourceText.trim() || !targetLang) {
                console.log('No source text or target language. Skipping translation.');
                setTranslatedText('');
                setError(null);
                return;
            }

            setIsLoading(true);
            setError(null);
            console.log('Starting translation process...');

            try {
                const encodedText = encodeURIComponent(sourceText);
                const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;
                console.log('Sending request to:', url);

                const response = await fetch(url);
                console.log('Response received. Status:', response.status);

                if (!response.ok) {
                    throw new Error('Translation request failed');
                }

                const data = await response.json();
                console.log('API Response:', data);

                if (data.responseStatus === 200) {
                    const matchQuality = data.responseData.match;
                    console.log('Translation match quality:', matchQuality);

                    if (matchQuality < 0.95 && retryCount < 3) {
                        console.log(`Match quality below threshold. Retrying... (Attempt ${retryCount + 1})`);
                        return translateText(retryCount + 1);
                    }

                    console.log('Translation successful:', data.responseData.translatedText);
                    setTranslatedText(data.responseData.translatedText);

                    // Check if translation is empty and try an alternative
                    if (!data.responseData.translatedText) {
                        console.log('Translation is empty. Trying alternative translation...');
                        const alternativeUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;
                        const alternativeResponse = await fetch(alternativeUrl);
                        const alternativeData = await alternativeResponse.json();

                        if (alternativeData.responseStatus === 200) {
                            console.log('Alternative translation successful:', alternativeData.responseData.translatedText);
                            setTranslatedText(alternativeData.responseData.translatedText || 'No alternative found');
                        } else {
                            console.warn('Alternative translation request failed:', alternativeData.responseStatus);
                        }
                    }
                } else {
                    console.warn('API returned non-200 status:', data.responseStatus);
                    throw new Error(data.responseDetails || 'Unknown translation error');
                }
            } catch (err: any) {
                console.error('Error translating text:', err);
                setError(err.message || 'Failed to translate text. Please try again.');
            } finally {
                setIsLoading(false);
                console.log('Translation process completed.');
            }
        };

        const debounceTimer = setTimeout(() => {
            console.log('Debounce timer expired. Calling translateText()');
            translateText();
        }, 500);

        return () => {
            console.log('Cleaning up: clearing debounce timer');
            clearTimeout(debounceTimer);
        };
    }, [sourceText, sourceLang, targetLang]);

    return { translatedText, error, isLoading };
};

export default useMyMemoryTranslate;
