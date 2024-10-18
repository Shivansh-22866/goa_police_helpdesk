# Speech Recognition and Translation App

This project is a Next.js application that utilizes speech recognition to convert spoken words into text. The recognized speech is then translated into another language using the GPT API and various translation APIs. Additionally, the app can read aloud both the original and translated text. It also features an embedded Botpress chatbot for enhanced interaction.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [APIs](#apis)

## Features

- Speech recognition to convert spoken language into text.
- Translation of recognized text into multiple languages using APIs.
- Text-to-speech functionality to read aloud both original and translated texts.
- Embedded Botpress chatbot for user interaction and assistance.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **React Hooks**: For managing state and side effects in functional components.
- **Web APIs**: Utilizing the Web Speech API for speech recognition and synthesis.
- **GPT API**: For generating translations and contextual responses.
- **Botpress**: An open-source chatbot framework embedded into the application.
- **Various Translation APIs**: For accurate language translation.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Setup .env.local file in the root of the project and add the following variables:**
   ```bash
   NEXT_PUBLIC_GPT_API_KEY=your_gpt_api_key
   NEXT_PUBLIC_TRANSLATION_API_KEY=your_translation_api_key
   NEXT_PUBLIC_BOTPRESS_URL=your_botpress_url
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. Navigate to localhost:3000 to view the application

## Usage
- Click the Start Listening button to begin speech recognition.
- Speak clearly into your microphone.
- The recognized speech will appear in the text area.
- Click on the Translate button to translate the text into your desired language.
- The translated text will be displayed, and you can click the Read Aloud button to hear it.

## APIs
**Web Speec API**
Used for speech recognition and text-to-speech capabilities.

**GPT API**
Utilized for generating translations and contextual information.

**Translation APIs**
Various APIs such as MyMemoryAPI and LibreTranslateAPI are employed for accurate translations. Ensure you replace the API keys in your .env.local file with your own.
