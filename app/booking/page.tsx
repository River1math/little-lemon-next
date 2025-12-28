// app/booking/page.tsx
"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
//import styles from "./booking.module.css";
import TimeSlotList from "../components/TimeSlotList";
import { initializeTimes, updateTimes } from "../lib/timesReducer";

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
    <section className="min-h-[70vh] px-4 flex items-center justify-center">

      <div className="w-full max-w-2xl rounded-xl border border-black/40 bg-sky-200 p-6 md:p-10">
     
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-center">
          <label className="flex items-center gap-2 border border-black/40 bg-amber-200 px-3 py-2 w-full md:w-auto justify-between">
            <span className="font-medium">Date</span>
            <input
              className="bg-transparent outline-none"
              type="date"
              value={date}
              onChange={onDateChange}
            />
          </label>

          <label className="flex items-center gap-2 border border-black/40 bg-amber-200 px-3 py-2 w-full md:w-auto justify-between">
            <span className="font-medium">Guests</span>
            <input
              className="bg-transparent outline-none w-20 text-center"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </label>
        </div>

        <h3 className="font-bold text-lg mt-6 mb-3 text-center md:text-left">
          Time
        </h3>

        <TimeSlotList times={availableTimes} value={time} onChange={setTime} />
    
        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
          <button
            className="border border-black/40 px-6 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => router.back()}
          >
            Cancel
          </button>

          <button
            className="border border-black/40 px-8 py-1 rounded-full bg-amber-300 hover:bg-amber-400 transition"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
