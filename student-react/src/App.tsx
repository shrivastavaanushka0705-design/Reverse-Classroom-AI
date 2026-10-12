import { useState } from "react";
import { DashboardShell } from "./pages/DashboardPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import { lessons } from "./data/lessons";
import type { LessonId, Page } from "./types";

export default function App() {
  const [student, setStudent] = useState<string | null>(null);
  const [page, setPage] = useState<Page>("overview");
  const [lessonId, setLessonId] = useState<LessonId>("recursion");
  const [confusion, setConfusion] = useState(18);
  const [paused, setPaused] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [toast, setToast] = useState("");

  function checkIn() {
    setConfusion(value => Math.min(100, value + 24));
    setToast("Check-in noted. Your teacher only sees class-wide patterns.");
    window.setTimeout(() => setToast(""), 3000);
  }

  function openLesson(id: LessonId, destination: "lecture" | "quiz") {
    setLessonId(id);
    setPaused(false);
    setPage(destination);
  }

  if (!student) return <LoginPage onDone={setStudent} />;

  const activeLesson = lessons[lessonId];
  return <DashboardShell
    name={student}
    page={page}
    setPage={setPage}
    onSignOut={() => { setStudent(null); setPage("overview"); }}
    toast={toast}
  >
    {page === "quiz" && <QuizPage key={lessonId} lesson={activeLesson} onAnswer={correct => { if (correct) setQuizCorrect(value => value + 1); else setConfusion(value => Math.min(100, value + 14)); }} />}
    {page !== "quiz" && <DashboardPage name={student} page={page} lesson={activeLesson} confusion={confusion} quizCorrect={quizCorrect} paused={paused} setPaused={setPaused} setPage={setPage} openLesson={openLesson} onConfused={checkIn} />}
  </DashboardShell>;
}
