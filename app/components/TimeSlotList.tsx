// app/components/TimeSlotList.tsx
"use client";

type TimeSlotListProps = {
  times: string[];                 // 可选时间段列表，如 ["17:00", "17:30", ...]
  value: string;                   // 当前被选中的时间段（受控值）
  onChange: (nextTime: string) => void; // 点击某个时间段时，通知父组件更新
};



 export default function TimeSlotList({ 
    times, 
    value, 
    onChange }: TimeSlotListProps) {

    const uniqueTimes = Array.from(new Set(times));
  return (
    <div className="time-grid" 
    role="radiogroup" 
    aria-label="Available times">

      {uniqueTimes.map((t) => (
        <button
          key={t}
          type="button"
          role="radio"
          aria-checked={value === t}
          className={`time-btn ${value === t ? "active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );




return (
  <div className="time-grid" role="radiogroup" aria-label="Available times">
    {uniqueTimes.map((t) => (
      <button
        key={t}
        type="button"
        role="radio"
        aria-checked={value === t}
        className={`time-btn ${value === t ? "active" : ""}`}
        onClick={() => onChange(t)}
      >
        {t}
      </button>
    ))}
  </div>
);

 }