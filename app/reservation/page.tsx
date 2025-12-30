// app/reservation/page.tsx
"use client";

import React, { Suspense, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitReservation } from "../lib/api/reservations";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note: string;
};

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="mx-auto w-full max-w-xl px-4 py-8">Loading...</div>}>
      <ReservationInner />
    </Suspense>
  );
}

function ReservationInner() {
  const router = useRouter();
  const params = useSearchParams();

  const booking = useMemo(() => {
    const date = params.get("date") ?? "";
    const time = params.get("time") ?? "";
    const guests = Number(params.get("guests") ?? "0");
    return { date, time, guests };
  }, [params]);

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    note: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((s) => ({ ...s, [k]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    const ok = await submitReservation({ ...booking, ...form });
    if (ok) router.push("/confirmed-booking");
  };

  return (
    <section className="reservation mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8 py-4">
      {/* Summary */}
      <div className="summary-card mb-4">
        <div className="text-center">
          <h4 className="text-xl font-semibold">Little Lemon</h4>
          <p className="text-sm">
            {booking.date} {booking.time} · Party of {booking.guests}
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Details</h3>

      <form className="my-2 space-y-3" ref={formRef} onSubmit={onSubmit}>
        <div className="grid grid-cols-[140px_1fr] items-center gap-x-4">
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <input
            id="firstName"
            className="w-full border px-3 py-2 rounded"
            value={form.firstName}
            onChange={onChange("firstName")}
            minLength={2}
            required
          />
        </div>

        <div className="grid grid-cols-[140px_1fr] items-center gap-x-4">
          <label htmlFor="lastName" className="text-sm">
            Last Name
          </label>
          <input
            id="lastName"
            className="w-full border px-3 py-2 rounded"
            value={form.lastName}
            onChange={onChange("lastName")}
            minLength={2}
            required
          />
        </div>

        <div className="grid grid-cols-[140px_1fr] items-center gap-x-4">
          <label htmlFor="phone" className="text-sm">
            Phone Number
          </label>
          <input
            id="phone"
            className="w-full border px-3 py-2 rounded"
            value={form.phone}
            onChange={onChange("phone")}
            type="tel"
            pattern="[0-9]{5,12}"
            title="please input 5-12 digit number"
            required
          />
        </div>

        <div className="grid grid-cols-[140px_1fr] items-center gap-x-4">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <input
            id="email"
            className="w-full border px-3 py-2 rounded"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            required
          />
        </div>

        <div className="grid grid-cols-[140px_1fr] items-start gap-x-4">
          <label htmlFor="note" className="text-sm pt-2">
            Add special request
          </label>
          <textarea
            id="note"
            className="w-full border px-3 py-2 rounded resize-none overflow-hidden min-h-24"
            value={form.note}
            onChange={onChange("note")}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
        </div>

        <div className="actions flex justify-between items-center pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={() => router.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-amber-200 hover:bg-amber-300"
          >
            Reserve
          </button>
        </div>
      </form>
    </section>
  );
}
