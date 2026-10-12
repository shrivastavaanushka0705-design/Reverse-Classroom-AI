import type { AuthInput, Question, User } from "../types";

const BASE = import.meta.env.VITE_API_BASE as string | undefined;
const WS_URL = import.meta.env.VITE_WS_URL as string | undefined;

/** Spring Boot: POST {BASE}/auth/login | /auth/register -> { token, user:{name, role} }. Demo mode when BASE is unset. */
export async function authenticate(mode: "login" | "register", d: AuthInput): Promise<User> {
  if (!BASE) { await new Promise(r => setTimeout(r, 500)); return { name: d.name || d.email.split("@")[0], role: d.role }; }
  const res = await fetch(`${BASE}/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
  if (!res.ok) throw new Error(res.status === 401 ? "Email or password is incorrect." : "Server error. Try again.");
  const payload: unknown = await res.json();
  if (!isRecord(payload) || !isRecord(payload.user) || typeof payload.user.name !== "string" || (payload.user.role !== "STUDENT" && payload.user.role !== "TEACHER")) {
    throw new Error("The server returned an invalid user profile.");
  }
  return { name: payload.user.name, role: payload.user.role };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const LINES = [
  "Today we're covering recursion, where a function solves a problem by calling itself on a smaller version.",
  "Every recursive function needs a base case, the input where it stops calling itself.",
  "Without a base case, the calls never end and the call stack overflows.",
  "Each call is pushed onto the call stack and waits for the call below it to return.",
  "Let's trace factorial of four: it asks for four times factorial of three, and so on down to one.",
  "When factorial of one returns, the stack unwinds and each waiting call finishes its multiplication.",
  "Some recursion can be rewritten as a loop. Tail recursion makes that easy for compilers.",
  "Memoization stores results we've already computed, so Fibonacci stops repeating the same work.",
];
/** Transcript lines from the Whisper service over WebSocket ({text}), or a timer in demo mode. Returns cleanup. */
export function openLecture(onLine: (text: string) => void): () => void {
  if (WS_URL) {
    const s = new WebSocket(WS_URL);
    s.onmessage = e => {
      let payload: unknown;
      try {
        payload = JSON.parse(e.data);
      } catch (error) {
        console.error("Lecture service sent invalid JSON.", error);
        return;
      }
      if (!isRecord(payload) || typeof payload.text !== "string") {
        console.error("Lecture service message must include a text string.");
        return;
      }
      onLine(payload.text);
    };
    s.onerror = event => console.error("Lecture service WebSocket connection failed.", event);
    return () => s.close();
  }
  let i = 0; onLine(LINES[i++ % LINES.length]);
  const t = setInterval(() => onLine(LINES[i++ % LINES.length]), 3500);
  return () => clearInterval(t);
}

export const TERMS = ["base case", "call stack", "tail recursion", "Memoization", "stack overflows"];
export const LESSONS: Record<string, string> = {
  "Base case": "Recursion base case explained in 3 minutes",
  "Call stack": "How the call stack works for recursion",
  "Tail recursion": "Tail recursion explained simply",
  "Memoization": "Memoization with Fibonacci explained",
};
export const QUIZ: Question[] = [
  { concept: "Base case", q: "What does the base case of a recursive function do?", options: ["Makes the function run faster", "Stops the recursion", "Calls the function twice"], answer: 1 },
  { concept: "Call stack", q: "What happens if a recursive function has no base case?", options: ["It returns zero", "It runs once", "The call stack overflows"], answer: 2 },
  { concept: "Memoization", q: "What does memoization save?", options: ["Results of earlier calls", "The source code", "Memory addresses"], answer: 0 },
];
