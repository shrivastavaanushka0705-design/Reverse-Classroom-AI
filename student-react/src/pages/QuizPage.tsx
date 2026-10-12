import { useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "../components/Brand";
import type { Lesson } from "../types";

export interface QuizPageProps {
  lesson: Lesson;
  onAnswer: (correct: boolean) => void;
}

function PageHeading({ kicker, title, subtitle }: { kicker: string; title: ReactNode; subtitle: string }) {
  return <div className="page-heading"><div><div className="section-kicker">{kicker}</div><h1>{title}</h1><p>{subtitle}</p></div></div>;
}

export default function QuizPage({ lesson, onAnswer }: QuizPageProps) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const complete = index >= lesson.questions.length;
  const current = lesson.questions[index];

  function answer(option: number) {
    if (choice !== null) return;
    const correct = option === current.answer;
    setChoice(option);
    if (correct) setScore(value => value + 1);
    onAnswer(correct);
  }
  function next() { setChoice(null); setIndex(value => value + 1); }
  function restart() { setChoice(null); setScore(0); setIndex(0); }

  return <div>
    <PageHeading kicker={`${lesson.course.toUpperCase()} · ${lesson.title.toUpperCase()}`} title={<>Quick quiz, <em>zero pressure.</em></>} subtitle="A few small questions help you see what’s sticking. If you miss one, open a related YouTube lesson and try again." />
    <div className="quiz-layout">
      <section className="content-card quiz-main">
        {complete ? <div className="quiz-complete"><div className="complete-icon"><Icon name="spark" size={26} /></div><span className="section-kicker">QUIZ COMPLETE</span><h2>{score === lesson.questions.length ? "Brilliant work." : "Every try helps you grow."}</h2><p>You got <strong>{score} of {lesson.questions.length}</strong> questions right. Your progress is yours — take a moment to feel good about showing up.</p><button className="primary-button" onClick={restart}>Try again <Icon name="arrow" size={16} /></button></div> : <><div className="quiz-progress-row"><span>{current.topic}</span><span>0{index + 1} <i>/ 0{lesson.questions.length}</i></span></div><div className="quiz-progress"><i style={{ width: `${(index / lesson.questions.length) * 100}%` }} /></div><h2 className="quiz-question">{current.prompt}</h2><div className="answer-list">{current.options.map((option, i) => <button key={option} className={`answer-option${choice !== null && i === current.answer ? " answer-correct" : choice === i ? " answer-wrong" : ""}`} disabled={choice !== null} onClick={() => answer(i)}><span className="answer-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>{choice !== null && i === current.answer && <Icon name="check" size={18} />}</button>)}</div>{choice !== null && <div className={`answer-feedback${choice === current.answer ? " feedback-right" : ""}`} role="status"><span>{choice === current.answer ? "That's right — lovely work!" : "Not quite, and that's completely okay."}</span>{choice !== current.answer && <a className="youtube-recommendation" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(current.chapter)}`} target="_blank" rel="noopener noreferrer"><Icon name="play" size={14} /> Watch a YouTube lesson on this topic <Icon name="arrow" size={13} /></a>}<button onClick={next}>{index === lesson.questions.length - 1 ? "See results" : "Next question"} <Icon name="arrow" size={15} /></button></div>}</>}
      </section>
      <aside className="quiz-aside"><section className="content-card quiz-tip"><div className="tip-icon"><Icon name="spark" size={19} /></div><span className="section-kicker">A GENTLE REMINDER</span><h3>Learning is not a race.</h3><p>Take your time on each question. Getting something wrong is just another way to find what to explore next.</p><div className="tip-bottom"><Icon name="lock" size={15} /> Your answers stay private</div></section><section className="points-card"><div className="points-medal">✦</div><div><span>QUIZ REWARD</span><strong>+20 points</strong><small>Just for giving it a go</small></div></section></aside>
    </div>
  </div>;
}
