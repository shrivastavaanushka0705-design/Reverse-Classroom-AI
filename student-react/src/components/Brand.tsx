import type { IconName } from "../types";

const icons: Record<IconName, string> = {
  home: "M3 10.8 12 3l9 7.8v9.7a.5.5 0 0 1-.5.5h-5.7v-6.4H9.2V21H3.5a.5.5 0 0 1-.5-.5z",
  book: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5zm0 0v17M8 6h8m-8 4h8",
  wave: "M2 12h3l2-7 4 14 3-11 2 7h6",
  chart: "M4 19V5m0 14h17M8 16v-5m5 5V7m5 9v-8",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  spark: "m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2zM19 3v4m-2-2h4M5 17v4m-2-2h4",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2",
  play: "m8 5 11 7-11 7z",
  check: "m5 12 4 4L19 6",
  lock: "M5 10h14v11H5zM8 10V7a4 4 0 0 1 8 0v3",
  flame: "M12 22c4 0 7-3 7-7 0-3-2-5-4-8 0 3-1 4-2 5 0-5-3-9-6-11 1 5-1 8-3 11-1 2-1 3-1 4 0 3 3 6 9 6Z",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-5h.01",
  chevron: "m9 18 6-6-6-6",
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg>;
}

export function Brand({ light = false }: { light?: boolean }) {
  return <div className={`brand${light ? " brand-light" : ""}`}>
    <span className="brand-symbol"><Icon name="book" size={22} /></span>
    <span>reverse<span className="brand-classroom">classroom</span></span>
  </div>;
}
