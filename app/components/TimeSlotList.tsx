// app/components/TimeSlotList.tsx
"use client";

type TimeSlotListProps = {
  times: string[];                 
  value: string;                   
  onChange: (nextTime: string) => void; 
};



 export default function TimeSlotList({ 
    times, 
    value, 
    onChange }: TimeSlotListProps) {

    const uniqueTimes = Array.from(new Set(times));
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3" 
    role="radiogroup" 
    aria-label="Available times">
    {uniqueTimes.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={value === t}
              onClick={() => onChange(t)}
              className={[
                "min-w-22 px-4 py-2 rounded-md border",
               // "mx-2 my-1",
                "border-black/40 transition",

                value === t
                  ? "bg-amber-300"
                  : "bg-gray-200 hover:bg-amber-200",
              ].join(" ")}
            >
          {t}
        </button>
      ))}
    </div>
  );
 }