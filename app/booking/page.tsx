// app/booking/page.tsx
"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./booking.module.css";
import TimeSlotList from "../components/TimeSlotList";
import { initializeTimes, updateTimes } from "../lib/timesReducer";


// 你原来从 ../state/timesReducer 引入，这里我先写 TS 类型占位
// type TimesAction = { type: "setDate"; payload: Date };
// type TimesReducer = (state: string[], action: TimesAction) => string[];

// TODO：把你原来的 initializeTimes/updateTimes 迁过来并加类型
// const initializeTimes = (): string[] => ["17:00", "18:00", "19:00", "20:00"];
// const updateTimes: TimesReducer = (state, action) => {
//   if (action.type === "setDate") return state; // 这里按你原逻辑替换
//   return state;
// };

export default function BookingPage() {
  const router = useRouter();

  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10)); // yyyy-mm-dd
  const [guests, setGuests] = useState<number>(2);
  const [time, setTime] = useState<string>("");

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    dispatch({ type: "setDate", payload: new Date(newDate) });
  };

  const onNext = () => {
    if (!time) {
      alert("Please select a time");
      return;
    }

    const qs = new URLSearchParams({
      date,
      time,
      guests: String(guests),
    });

    router.push(`/reservation?${qs.toString()}`);
  };

  return (
    <section className={styles.booking}>
      <label>
        Date
        <input type="date" value={date} onChange={onDateChange} />
      </label>

      <label>
        Guests
        <input
          type="number"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />
      </label>

      <h3>Time</h3>
      <TimeSlotList times={availableTimes} value={time} onChange={setTime} />

      <div className="flex items-center p-4">
        <button className="border border-black-300 px-4 py-0 rounded-full hover:bg-gray-100 transition" onClick={() => router.back()}>Cancel</button>
        <button className="ml-5 border px-6 py-0 rounded-full hover:bg-gray-100 transition" onClick={onNext}>Next</button>
      </div>
    </section>
  );
}
