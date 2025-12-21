// app/reservation/page.tsx
"use client";

import { useMemo, useRef, useState } from "react";
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
    <section className="reservation">
      <div className="summary-card">
        <div>
          <h4>Little Lemon</h4>
          <p>
            {booking.date} {booking.time} · Party of {booking.guests}
          </p>
        </div>
      </div>

      <h3>Contact Details</h3>
      <form ref={formRef} onSubmit={onSubmit}>
        <label>
          First Name
          <input value={form.firstName} onChange={onChange("firstName")} minLength={2} required />
        </label>
        <br />

        <label>
          Last Name
          <input value={form.lastName} onChange={onChange("lastName")} minLength={2} required />
        </label>
        <br />

        <label>
          Phone Number
          <input
            value={form.phone}
            onChange={onChange("phone")}
            type="tel"
            pattern="[0-9]{5,12}"
            title="please input 5-12 digit number"
            required
          />
        </label>
        <br />

        <label>
          Email Address
          <input type="email" value={form.email} onChange={onChange("email")} required />
        </label>
        <br />

        <label>
          Add special request...
          <textarea value={form.note} onChange={onChange("note")} />
        </label>

        <div className="actions">
          <button type="button" onClick={() => router.back()}>
            Cancel
          </button>
          <button type="submit">Reserve</button>
        </div>
      </form>
    </section>
  );
}
