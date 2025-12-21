// lib/api/reservations.ts
export async function submitReservation(_payload: unknown): Promise<boolean> {
  // TODO：以后你可以在这里接真实 API
  await new Promise((r) => setTimeout(r, 300));
  return true;
}
