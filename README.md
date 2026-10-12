# Reverse Classroom

Reverse Classroom is a responsive React front-end prototype for a student learning app. It includes sign-in and account creation, a personalized learning dashboard, a lecture companion, an interactive quiz, private confusion check-ins, and sample learning insights.

## Run the front-end

```powershell
cd student-react
npm install
npm run dev
```

Open the local URL printed by Vite. Sign in with any valid email address and a password of at least six characters; the form is a local demo and does not create or authenticate an account.

## Prototype scope

- The sign-in, quiz, check-in, navigation, and lecture interactions are front-end-only.
- The lecture library includes sample Data Structures lessons (recursion and stacks) and DBMS database foundations. Transcripts, quiz questions, rewards, and analytics use sample data.
- Wrong quiz answers offer a YouTube search link for the related chapter or concept.
- Whisper, spaCy, GPT, camera/spatial expression detection, and a backend are not connected. The lecture preview does not access a microphone or camera.
- The interface adapts to desktop, tablet, and mobile browser sizes. This existing Vite project is a responsive React web app, not a React Native/Expo application.
