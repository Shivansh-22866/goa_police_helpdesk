"use client";
import 'regenerator-runtime/runtime';
import Image from "next/image";
import TextArea from "@/components/Inputs/TextArea";
import FileUpload from '@/components/Inputs/FileUpload';
import SpeechRecognitionComponent from '@/components/SpeechRecognition/SpeechRecognition';
import { ChangeEvent, useEffect, useState } from "react";
import { IconCopy, IconStar, IconThumbDown, IconThumbUp, IconVolume } from '@tabler/icons-react';
import useMyMemoryTranslate from "@/hooks/useMyMemoryTranslate";
import LinkPaste from '@/components/Inputs/LinkPaste';
import LanguageSelector from '@/components/Inputs/LanguageSelector';
import SvgDecorations from '@/components/SvgDecorations';
import { rtfToText } from '@/utils/rtfToText'
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [languages] = useState<string[]>(["en", "hi", "kn", "te"]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [speechRecognitionLanguages] = useState<string[]>(["en", "hi"])
  const [speechRecognitionLanguage, setSpeechRecognitionLanguage] = useState<string>("en")
  const { translatedText } = useMyMemoryTranslate(sourceText, speechRecognitionLanguage, selectedLanguage);

  const handleAudioPlayback = (text: string, lang: string) => {
    console.log(text, lang)
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    if(lang == 'kn') utterance.lang = 'hi';
    if(lang == 'te') utterance.lang = 'hi';
    window.speechSynthesis.speak(utterance);
  };

  const listAvailableVoices = () => {
    const voices = window.speechSynthesis.getVoices();
  
    const voiceList = voices.map(voice => ({
      name: voice.name,
      lang: voice.lang,
      default: voice.default ? 'Yes' : 'No'
    }));
  
    console.log(voiceList);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text.slice(0, 2000));
      };
      reader.readAsText(file);
    }
  };
  
  const handleSourceTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= 2000) {
      setSourceText(newText);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", translatedText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };
  
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    setImageVisible(true);
  }, []);

  return (
    <div>
      <div className="h-full  w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[95rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-7xl font-bold text-neutral-200">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto my-4"
                style={{ display: imageVisible ? 'block' : 'none' }}
              >
                <Image src="/emblem.png" className='mx-auto' alt="emblem" width={180} height={120} />
              </motion.div>
                <div className='my-8'>
                  <AnimatedText textType='title'/>
                </div>
                <AnimatedText textType='subtitle'/>
              </h1>
              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                      id="source-language"
                      value={sourceText}
                      onChange={handleSourceTextChange}
                      placeholder={"Enter your query here"}
                    />
                    <div className="flex flex-row justify-between w-full">
                      <span className="cursor-pointer space-x-2 flex flex-row">
                        <SpeechRecognitionComponent setSourceText={setSourceText} lang={speechRecognitionLanguage} />
                        <LanguageSelector selectedLanguage={speechRecognitionLanguage} setSelectedLanguage={setSpeechRecognitionLanguage} languages={speechRecognitionLanguages} />
                        <IconVolume size={22} onClick={() => handleAudioPlayback(sourceText, speechRecognitionLanguage)} />
                        <FileUpload handleFileUpload={handleFileUpload} />
                      </span>
                      <span className='text-sm pr-4'>
                        {sourceText.length} / 2000
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                      id={'target-language'}
                      value={translatedText}
                      onChange={() => {}}
                      placeholder='Target Language'
                    />
                    <div className='flex flex-row justify-between w-full'>
                      <span className='cursor-pointer flex space-x-2 flex-row items-center'>
                        <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} languages={languages} />
                        <IconVolume size={22} onClick={() => handleAudioPlayback(translatedText, selectedLanguage)} />
                      </span>
                      <div className='flex flex-row items-center space-x-2 pr-4 cursor-pointer'>
                        <IconCopy size={22} onClick={handleCopyToClipboard} />
                        {copied && <span className='text-xs text-green-500'>Copied</span>}
                        <IconThumbUp size={22} onClick={handleLike} className={liked ? "text-green-500" : ""} />
                        <IconThumbDown size={22} onClick={handleDislike} className={disliked ? "text-red-500" : ""} />
                        <IconStar size={22} onClick={handleFavorite} className={favorite ? "text-yellow-500" : ""} />
                      </div>
                    </div>
                  </div>
                </div>
                <SvgDecorations />
              </div>
            </div>
          </div>
          <Link target='_blank' className='hover:text-blue-500' href={"https://my.spline.design/virtualroomscene-29e41cf458ad81090d29184e5a5e7e40/"}>
            3D Room Map (Experimental)
          </Link>
        </div>
      </div>
    </div>
  );
}
