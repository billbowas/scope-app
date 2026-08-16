// Fake Fall 2026 semester — mirrors the wireframe's three courses.
const COURSES = [
  { id: "fin", name: "Corporate Finance", code: "FINC 3010", color: "var(--course-1)", count: 42 },
  { id: "stat", name: "Statistics", code: "STAT 1201", color: "var(--course-2)", count: 31 },
  { id: "law", name: "Constitutional Law", code: "POLS 3320", color: "var(--course-3)", count: 24 }
];

const NEXT_48 = [
  { id: 1, title: "Problem Set 2", course: "Corporate Finance", color: "var(--course-1)", type: "homework", due: "due tomorrow 11:59 PM", magnitude: 1, watched: true },
  { id: 2, title: "Chapter 4 reading", course: "Statistics", color: "var(--course-2)", type: "reading", due: "due tomorrow", magnitude: 1 },
  { id: 3, title: "Quiz 1", course: "Corporate Finance", color: "var(--course-1)", type: "quiz", due: "due Thursday", magnitude: 2 },
  { id: 4, title: "Case brief: Marbury v. Madison", course: "Constitutional Law", color: "var(--course-3)", type: "homework", due: "due Friday", magnitude: 1 }
];

const WEEK_BARS = [12, 18, 14, 22, 26, 20, 31, 41, 28, 24, 33, 22, 19, 27, 15]
  .map((v, i) => ({ label: "W" + (i + 1), value: v, peak: v === 41 }));

const DAY_BARS = [{ label: "Mon", value: 3 }, { label: "Tue", value: 5 }, { label: "Wed", value: 9, peak: true }, { label: "Thu", value: 6 }, { label: "Fri", value: 4 }, { label: "Sat", value: 0 }, { label: "Sun", value: 2 }];

const HEAT = (() => {
  const out = [];
  for (let w = 0; w < 15; w++) for (let d = 0; d < 7; d++) {
    const base = w === 7 ? 6 : Math.round(Math.abs(Math.sin(w * 1.7 + d)) * 4);
    const load = d > 4 ? Math.max(0, base - 3) : base;
    if (load) out.push({ week: w, day: d, load, items: Math.max(1, Math.round(load / 2)), label: "W" + (w + 1) + " " + ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d] });
  }
  return out;
})();

const LANES = [
  { name: "Corporate Finance", color: "var(--course-1)", items: [{ week: 1, label: "PS 1", magnitude: 1, date: "Sep 5" }, { week: 3, label: "Quiz 1", magnitude: 2, date: "Sep 17" }, { week: 6, label: "Midterm", magnitude: 3, date: "Oct 15" }, { week: 10, label: "Quiz 3", magnitude: 2, date: "Nov 6" }, { week: 13, label: "Final", magnitude: 3, date: "Dec 10" }] },
  { name: "Statistics", color: "var(--course-2)", items: [{ week: 2, label: "Lab 1", magnitude: 1, date: "Sep 11" }, { week: 6, label: "Project draft", magnitude: 3, date: "Oct 16" }, { week: 9, label: "Quiz 4", magnitude: 2, date: "Nov 2" }, { week: 14, label: "Final", magnitude: 3, date: "Dec 12" }] },
  { name: "Constitutional Law", color: "var(--course-3)", items: [{ week: 4, label: "Case brief", magnitude: 1, date: "Sep 24" }, { week: 6, label: "Paper 1", magnitude: 3, date: "Oct 14" }, { week: 11, label: "Paper 2", magnitude: 3, date: "Nov 18" }] }
];

const SERIES = [
  { key: "ps", title: "Problem Set 1–12", cadence: "weekly, Fridays", range: "Sep 5 – Nov 21", count: 12, magnitude: 1, items: [{ title: "PS 1", due: "Sep 5" }, { title: "PS 2", due: "Sep 12" }, { title: "PS 3", due: "Sep 19" }], more: "+ 9 more · click any row to edit inline" },
  { key: "read", title: "Readings", cadence: "one per session", range: "Sep 2 – Dec 4", count: 8, magnitude: 1, items: [{ title: "Ch. 1–2", due: "Sep 2" }, { title: "Ch. 3", due: "Sep 9" }], more: "+ 6 more" },
  { key: "quiz", title: "Quizzes 1–4", cadence: "every 3 weeks", range: "Sep 17 – Nov 19", count: 4, magnitude: 2, items: [{ title: "Quiz 1", due: "Sep 17" }, { title: "Quiz 2", due: "Oct 8" }], more: "+ 2 more" },
  { key: "exam", title: "Midterm · Final", cadence: "fixed dates", range: "Oct 15 · Dec 10", count: 2, magnitude: 3, items: [{ title: "Midterm", due: "Oct 15" }, { title: "Final", due: "Dec 10" }] }
];

const QUESTIONS = [
  { id: "q1", prompt: "Are weekly readings tracked items, or just schedule context?", options: ["Track them", "Schedule only"], answer: "Schedule only" },
  { id: "q2", prompt: "“Problem Set every Friday” — start date?", input: true, placeholder: "Sep 5, 2026" },
  { id: "q3", prompt: "The syllabus says “Midterm — Week 8.” That’s Oct 13–17. Which day?", options: ["Mon Oct 13", "Wed Oct 15", "Fri Oct 17"], answer: "Wed Oct 15" }
];

Object.assign(window, { SCOPE_DATA: { COURSES, NEXT_48, WEEK_BARS, DAY_BARS, HEAT, LANES, SERIES, QUESTIONS } });
