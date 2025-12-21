export {};

declare global {
  interface Window {
    fetchAPI: (date: Date) => string[];
  }
}
