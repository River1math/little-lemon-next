// app/lib/timesReducer.ts
import { fetchAPI } from "./api/fakeApi";

export type TimesAction = { type: "setDate"; payload: Date };

export function initializeTimes(): string[] {
  return fetchAPI(new Date());
}

export function updateTimes(state: string[], action: TimesAction): string[] {
  switch (action.type) {
    case "setDate":
      return fetchAPI(action.payload);
    default:
      return state;
  }
}
