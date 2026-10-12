import type { Lesson, LessonId } from "../types";

export const lessons: Record<LessonId, Lesson> = {
  recursion: {
    id: "recursion",
    title: "Recursion",
    course: "Data Structures",
    description: "Understand base cases, call stacks, and how recursive calls solve smaller problems.",
    duration: "18 min",
    symbol: "f(x)",
    concepts: ["Base case", "Call stack", "Memoization"],
    transcript: [
      "Today we're exploring recursion: a function solving a problem by calling itself on a smaller version.",
      "Every recursive function needs a base case — the condition that tells it when to stop.",
      "Without that stopping point, calls keep stacking up until the call stack overflows.",
      "Think of each call as a note waiting for the one below it to come back with an answer.",
      "When the base case returns, the call stack unwinds and each waiting function finishes its work.",
    ],
    questions: [
      { topic: "RECURSION · BASICS", prompt: "What is the purpose of a base case in a recursive function?", options: ["To make each function call faster", "To stop the recursion when a condition is met", "To call the function one more time"], answer: 1, chapter: "data structures recursion base case explained" },
      { topic: "RECURSION · CALL STACK", prompt: "What can happen when a recursive function has no base case?", options: ["The call stack can overflow", "The function returns zero", "The function runs only once"], answer: 0, chapter: "recursion call stack and stack overflow" },
      { topic: "RECURSION · OPTIMIZATION", prompt: "What does memoization help a recursive function do?", options: ["Store results from previous calls", "Remove its base case", "Use more call stack space"], answer: 0, chapter: "recursion memoization explained" },
    ],
  },
  stack: {
    id: "stack",
    title: "Stacks",
    course: "Data Structures",
    description: "Learn LIFO, push and pop operations, and where stacks are used in programs.",
    duration: "16 min",
    symbol: "LIFO",
    concepts: ["LIFO order", "Push & pop", "Stack applications"],
    transcript: [
      "A stack is a linear data structure that follows last in, first out — often shortened to LIFO.",
      "Push adds a new item to the top of the stack.",
      "Pop removes and returns the item currently at the top.",
      "The call stack uses this same idea to keep track of active function calls.",
      "Stacks are also useful for undo actions, browser history, and checking balanced brackets.",
    ],
    questions: [
      { topic: "STACKS · LIFO", prompt: "What does LIFO mean for a stack?", options: ["The first item added is removed first", "The last item added is removed first", "Items are removed in alphabetical order"], answer: 1, chapter: "data structures stack LIFO explained" },
      { topic: "STACKS · OPERATIONS", prompt: "Which operation removes the top item from a stack?", options: ["Push", "Peek", "Pop"], answer: 2, chapter: "stack data structure push and pop operations" },
      { topic: "STACKS · APPLICATIONS", prompt: "Which real programming feature commonly uses a stack?", options: ["Tracking active function calls", "Sorting every item alphabetically", "Storing only the largest value"], answer: 0, chapter: "stack applications call stack undo history" },
    ],
  },
  dbms: {
    id: "dbms",
    title: "Database foundations",
    course: "DBMS",
    description: "Explore tables, keys, and the relationships that keep data organized.",
    duration: "20 min",
    symbol: "DB",
    concepts: ["Tables & rows", "Primary keys", "Relationships"],
    transcript: [
      "A database stores information in an organized way so it can be queried and updated.",
      "In a relational database, a table groups related data into rows and columns.",
      "A primary key uniquely identifies each row in a table.",
      "A foreign key can connect a row to a related record in another table.",
      "These relationships help keep data consistent and reduce unnecessary duplication.",
    ],
    questions: [
      { topic: "DBMS · TABLES", prompt: "In a relational database, what does a row usually represent?", options: ["One record", "A database password", "A relationship diagram"], answer: 0, chapter: "DBMS relational database tables rows and columns" },
      { topic: "DBMS · KEYS", prompt: "What is the main purpose of a primary key?", options: ["To uniquely identify a table row", "To encrypt every column", "To sort records by date"], answer: 0, chapter: "DBMS primary key explained with examples" },
      { topic: "DBMS · RELATIONSHIPS", prompt: "What can a foreign key do?", options: ["Link a record to related data in another table", "Delete every duplicate automatically", "Replace all columns in a table"], answer: 0, chapter: "DBMS foreign key relationships explained" },
    ],
  },
};

export const lessonList = Object.values(lessons);
