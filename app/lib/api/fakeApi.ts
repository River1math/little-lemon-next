// app/lib/fakeApi.ts

export function fetchAPI(date: Date): string[] {
  // 你可以先用最简单的逻辑
  return ["17:00", "18:00", "19:00", "20:00","20:30"];
}

export function submitAPI(_: unknown): boolean {
  return true;
}
