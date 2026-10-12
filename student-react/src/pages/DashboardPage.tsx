import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Brand, Icon } from "../components/Brand";
import { lessonList } from "../data/lessons";
import type { IconName, Lesson, LessonId, Page } from "../types";

export interface DashboardShellProps {
  name: string;
  page: Page;
  setPage: (page: Page) => void;
  onSignOut: () => void;
  toast: string;
  children: ReactNode;
}

export interface DashboardPageProps {
  name: string;
  page: Exclude<Page, "quiz">;
  lesson: Lesson;
  confusion: number;
  quizCorrect: number;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  setPage: (page: Page) => void;
  openLesson: (id: LessonId, page: "lecture" | "quiz") => void;
  onConfused: () => void;
}

const today = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date()).toUpperCase();

export function DashboardShell({ name, page, setPage, onSignOut, toast, children }: DashboardShellProps) {
  const navItems: { id: Page; label: string; icon: IconName }[] = [
    { id: "overview", label: "Overview", icon: "home" },
    { id: "lecture", label: "Lecture room", icon: "wave" },
    { id: "quiz", label: "Quick quiz", icon: "book" },
    { id: "insights", label: "My progress", icon: "chart" },
  ];
  return <div className="app-shell">
    <aside className="sidebar">
      <Brand />
      <div className="nav-caption">LEARN</div>
      <nav aria-label="Main navigation">{navItems.map(item => <button key={item.id} className={`nav-item${page === item.id ? " active" : ""}`} onClick={() => setPage(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{item.id === "lecture" && <i className="nav-live-dot" />}</button>)}</nav>
      <div className="sidebar-spacer" />
      <div className="streak-card"><span className="streak-icon"><Icon name="flame" size={18} /></span><div><strong>3 day streak</strong><small>Keep your momentum</small></div></div>
      <button className="profile-button" onClick={onSignOut}><span className="profile-avatar">{name.charAt(0).toUpperCase()}</span><span className="profile-info"><strong>{name}</strong><small>Student account</small></span><span className="profile-out">↗</span></button>
    </aside>
    <div className="main-area">
      <header className="topbar">
        <div className="mobile-brand"><Brand /></div>
        <div className="breadcrumb"><span>Learning space</span><Icon name="chevron" size={14} /><strong>{navItems.find(item => item.id === page)?.label}</strong></div>
        <div className="topbar-actions"><span className="preview-pill"><span /> PREVIEW</span><button className="icon-button" aria-label="Notifications" onClick={() => window.alert("You're all caught up!") }><Icon name="bell" /></button><span className="top-avatar">{name.charAt(0).toUpperCase()}</span></div>
      </header>
      <main className="page-content">{children}</main>
    </div>
    <nav className="mobile-nav" aria-label="Main navigation">{navItems.map(item => <button key={item.id} className={page === item.id ? "selected" : ""} onClick={() => setPage(item.id)}><Icon name={item.icon} size={19} /><span>{item.label}</span></button>)}</nav>
    {toast && <div className="toast-message" role="status"><Icon name="check" size={16} /> {toast}</div>}
  </div>;
}

function PageHeading({ kicker, title, subtitle, action }: { kicker: string; title: ReactNode; subtitle: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="section-kicker">{kicker}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function StatCard({ icon, label, value, unit, note, tone }: { icon: IconName; label: string; value: string; unit: string; note: string; tone: string }) {
  return <section className="stat-card"><div className={`stat-icon ${tone}`}><Icon name={icon} size={18} /></div><span className="stat-label">{label}</span><div className="stat-value">{value}<small>{unit}</small></div><span className="stat-note">{note}</span></section>;
}

function Overview({ name, go, openLesson, confusion, onConfused }: { name: string; go: (page: Page) => void; openLesson: (lesson: LessonId, page: "lecture" | "quiz") => void; confusion: number; onConfused: () => void }) {
  return <div>
    <PageHeading kicker={today} title={<>A little progress goes <em>a long way,</em> {name}.</>} subtitle="Here's your learning space. Take it one concept at a time." action={<button className="quiet-button" onClick={() => go("insights")}><Icon name="chart" size={17} /> My progress</button>} />
    <section className="featured-lesson">
      <div className="featured-content"><span className="feature-tag"><span className="feature-dot" /> YOUR CLASS IS LIVE</span><h2>Data Structures:<br /><em>Recursion</em></h2><p>Follow along with the lecture, check your understanding, and earn rewards as you go.</p><div className="feature-actions"><button className="primary-button" onClick={() => openLesson("recursion", "lecture")}><Icon name="wave" size={17} /> Join lecture <Icon name="arrow" size={16} /></button><span className="feature-privacy"><Icon name="lock" size={14} /> Private by design</span></div></div>
      <div className="feature-art" aria-hidden="true"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-center"><span>f</span><i>↗</i></div><div className="art-chip chip-top"><Icon name="check" size={14} /> You're on track</div><div className="art-chip chip-bottom"><span className="mini-bars"><i /><i /><i /><i /><i /></span> 78% understanding</div><span className="art-star">✳</span></div>
    </section>
    <div className="stat-grid">
      <StatCard icon="target" label="Learning score" value="82" unit="/ 100" note="+8 points this week" tone="green" />
      <StatCard icon="flame" label="Current streak" value="3" unit=" days" note="One more day to beat your best" tone="gold" />
      <StatCard icon="spark" label="Rewards earned" value="240" unit=" pts" note="You're 60 pts from your next reward" tone="blue" />
      <StatCard icon="wave" label="Class understanding" value="78" unit="%" note="Looking good — keep it up" tone="purple" />
    </div>
    <section className="lesson-library">
      <div className="lesson-library-heading"><div><span className="section-kicker">PICK UP SOMETHING NEW</span><h2>Your lecture library</h2><p>Choose a topic to open its sample lecture or try a short quiz.</p></div><span className="library-count">03 LESSONS</span></div>
      <div className="lesson-library-grid">{lessonList.map((lesson, index) => <article className="lesson-library-card" key={lesson.id}><div className={`library-art library-art-${lesson.id}`}><span>{lesson.symbol}</span><small>{String(index + 1).padStart(2, "0")}</small></div><div className="library-card-content"><span className="library-course">{lesson.course}</span><h3>{lesson.title}</h3><p>{lesson.description}</p><div className="library-card-footer"><span><Icon name="clock" size={13} /> {lesson.duration}</span><div><button onClick={() => openLesson(lesson.id, "lecture")}>Lecture</button><button onClick={() => openLesson(lesson.id, "quiz")}>Quiz</button></div></div></div></article>)}</div>
    </section>
    <div className="overview-grid">
      <section className="content-card progress-card">
        <div className="card-heading"><div><h3>Your learning rhythm</h3><p>A gentle look at your activity this week</p></div><span className="select-label">THIS WEEK <Icon name="chevron" size={13} /></span></div>
        <div className="chart-legend"><span><i className="legend-primary" /> Learning time</span><span><i className="legend-secondary" /> Quiz score</span></div>
        <div className="activity-chart" aria-label="Weekly learning activity chart">{[["Mon", 44, 51], ["Tue", 68, 61], ["Wed", 50, 76], ["Thu", 83, 69], ["Fri", 62, 88], ["Sat", 40, 53], ["Sun", 28, 38]].map(([day, a, b]) => <div className="chart-column" key={day}><div className="chart-bars"><i style={{ height: `${a}%` }} /><i style={{ height: `${b}%` }} /></div><span>{day}</span></div>)}</div>
        <div className="chart-foot"><span><span className="status-check"><Icon name="check" size={12} /></span> You're building a lovely habit.</span><strong>4.5 hrs this week</strong></div>
      </section>
      <section className="content-card next-card">
        <div className="card-heading"><div><h3>Your next steps</h3><p>Small wins add up</p></div><span className="steps-count">2 TO GO</span></div>
        <button className="next-item" onClick={() => go("quiz")}><span className="next-icon quiz-tile"><Icon name="book" /></span><span className="next-copy"><strong>Try a quick quiz</strong><small>3 questions · about 2 min</small></span><Icon name="chevron" size={17} /></button>
        <button className="next-item" onClick={() => openLesson("recursion", "lecture")}><span className="next-icon lesson-tile"><Icon name="play" /></span><span className="next-copy"><strong>Continue your lecture</strong><small>Recursion · 12 min left</small></span><Icon name="chevron" size={17} /></button>
        <div className="next-encouragement"><span>✦</span> No rush — learn at your own pace.</div>
      </section>
    </div>
    <div className="bottom-grid">
      <section className="content-card confusion-card"><div className="confusion-top"><span className="confusion-icon"><Icon name="spark" size={18} /></span><div><h3>Need a little help?</h3><p>Ask for support privately. No raised hand needed.</p></div></div><div className="confusion-bottom"><span>{confusion > 40 ? "A quick recap is ready when you are." : "Your check-in is private and just for you."}</span><button className="outline-button" onClick={onConfused}>I'm feeling stuck <Icon name="arrow" size={15} /></button></div></section>
      <section className="reward-banner"><div className="reward-star">✦</div><div><span>YOUR NEXT MILESTONE</span><strong>Curious mind</strong><small>Earn 60 more points to unlock your next reward</small></div><div className="reward-progress"><div><i /></div><span>240 / 300 pts</span></div></section>
    </div>
    <p className="prototype-caption">A front-end preview. Lecture, quiz, and analytics use sample classroom data.</p>
  </div>;
}

function LessonLecture({ lesson, paused, setPaused, onConfused, goToQuiz, browseLessons }: { lesson: Lesson; paused: boolean; setPaused: (value: boolean) => void; onConfused: () => void; goToQuiz: () => void; browseLessons: () => void }) {
  const [lineCount, setLineCount] = useState(2);
  useEffect(() => { setLineCount(2); }, [lesson.id]);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setLineCount(count => Math.min(count + 1, lesson.transcript.length)), 5200);
    return () => window.clearInterval(timer);
  }, [lesson, paused]);
  return <div>
    <PageHeading kicker={`${lesson.course.toUpperCase()} · ${lesson.title.toUpperCase()}`} title={<>Lecture room <em>& companion.</em></>} subtitle={lesson.description} action={<span className="live-label"><i /> DEMO LISTENING</span>} />
    <div className="lecture-layout">
      <section className="content-card transcript-card"><div className="card-heading"><div><h3>{lesson.title} lecture</h3><p>Sample live captions for this lesson</p></div><span className="caption-tag">SAMPLE TRANSCRIPT</span></div>
        <div className="transcript-scroll" aria-live="polite">{lesson.transcript.slice(0, lineCount).map((line, i) => <p className="transcript-line" key={line}><time>{String(10 + Math.floor(i * 0.8)).padStart(2, "0")}:{String((i * 18) % 60).padStart(2, "0")}</time><span>{line}</span></p>)}</div>
        <div className="transcript-controls"><button className="outline-button" onClick={() => setPaused(!paused)}><Icon name={paused ? "play" : "wave"} size={16} /> {paused ? "Resume captions" : "Pause captions"}</button><span className={`listening-state${paused ? " is-paused" : ""}`}><i /> {paused ? "Paused" : "Listening to sample"}</span></div>
      </section>
      <aside className="lecture-aside">
        <section className="content-card lecture-topic"><span className="section-kicker">{lesson.course}</span><div className="topic-mark"><span>{lesson.symbol}</span></div><h3>{lesson.title}</h3><p>{lesson.description}</p><div className="topic-meta"><span><Icon name="clock" size={15} /> {lesson.duration}</span><span><Icon name="book" size={15} /> {lesson.questions.length} quiz questions</span></div></section>
        <section className="help-card"><div className="help-orb">?</div><div><strong>Need a recap?</strong><p>Pause and revisit the ideas at your own pace.</p><button className="text-button" onClick={onConfused}>I need a little help <Icon name="arrow" size={14} /></button></div></section>
        <button className="browse-lessons-button" onClick={browseLessons}>Browse all lessons <Icon name="arrow" size={14} /></button>
      </aside>
    </div>
    <div className="lecture-lower"><section className="content-card concept-card"><div className="card-heading"><div><h3>Key ideas in this lesson</h3><p>Concepts to look out for as you follow along</p></div></div><div className="concept-pills">{lesson.concepts.map((concept, index) => <span key={concept}>{concept} <i>{index === 0 ? "Covered" : index === 1 ? "In progress" : "Coming up"}</i></span>)}</div></section><section className="content-card lecture-next"><div><span className="section-kicker">READY WHEN YOU ARE</span><h3>Check what you've learned</h3></div><button className="primary-button" onClick={goToQuiz}>Start quiz <Icon name="arrow" size={16} /></button></section></div>
    <p className="prototype-caption">Lecture captions are sample data; no microphone or AI service is connected.</p>
  </div>;
}

function Insights({ confusion, quizCorrect }: { confusion: number; quizCorrect: number }) {
  return <div><PageHeading kicker="YOUR JOURNEY, AT A GLANCE" title={<>Look how far <em>you've come.</em></>} subtitle="A private, encouraging view of your learning — no comparisons, just your progress." /><div className="insights-grid"><section className="content-card insight-score"><div className="card-heading"><div><h3>Understanding over time</h3><p>Your weekly check-in score</p></div><span className="score-tag">THIS WEEK</span></div><div className="score-visual"><div className="score-donut"><div><strong>82</strong><span>your score</span></div></div><div className="score-copy"><strong>You're finding your rhythm.</strong><p>You've made steady progress this week. Keep being curious — that's what counts.</p><span className="positive-change"><Icon name="arrow" size={14} /> 8 points up this week</span></div></div><div className="insight-chart">{[47, 56, 51, 69, 64, 82, 78].map((v, i) => <div key={i} className="insight-day"><div><i style={{ height: `${v}%` }} /></div><span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span></div>)}</div></section><section className="content-card insight-signals"><div className="card-heading"><div><h3>Your learning signals</h3><p>Small, useful patterns from your activity</p></div></div><div className="signal-row"><span className="signal-icon signal-green"><Icon name="check" /></span><div><strong>Quiz understanding</strong><small>Correct answers in this preview</small></div><b>{quizCorrect}</b></div><div className="signal-row"><span className="signal-icon signal-amber"><Icon name="spark" /></span><div><strong>Check-in support</strong><small>Your private confusion check-in</small></div><b>{confusion}%</b></div><div className="signal-row"><span className="signal-icon signal-blue"><Icon name="clock" /></span><div><strong>Learning time</strong><small>Across your classroom this week</small></div><b>4.5h</b></div></section><section className="content-card insight-privacy"><span className="privacy-icon"><Icon name="lock" /></span><div><h3>Made for your growth, not comparison.</h3><p>This preview shows how personal insights can support each learner. In a live classroom, shared views can focus on class-level patterns to help educators offer support sooner.</p></div></section><section className="insight-next"><div className="next-medal">✦</div><span className="section-kicker">KEEP GOING, AT YOUR PACE</span><h3>Consistency beats perfection.</h3><p>Each lecture, question, and little check-in is a win worth celebrating.</p></section></div><p className="prototype-caption">Analytics shown here are sample values for the front-end preview.</p></div>;
}

export default function DashboardPage({ name, page, lesson, confusion, quizCorrect, paused, setPaused, setPage, openLesson, onConfused }: DashboardPageProps) {
  return <>
    {page === "overview" && <Overview name={name} go={setPage} openLesson={openLesson} confusion={confusion} onConfused={onConfused} />}
    {page === "lecture" && <LessonLecture lesson={lesson} paused={paused} setPaused={setPaused} onConfused={onConfused} goToQuiz={() => setPage("quiz")} browseLessons={() => setPage("overview")} />}
    {page === "insights" && <Insights confusion={confusion} quizCorrect={quizCorrect} />}
  </>;
}
