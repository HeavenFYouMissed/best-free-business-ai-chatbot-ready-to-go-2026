export type Cell = true | false | "partial" | string;

export type Row = {
  feature: string;
  publishd: Cell;
  mobiloud: Cell;
  natively: Cell;
  diy: Cell;
};

export const comparison: Row[] = [
  { feature: "Pricing", publishd: "$399 one-time", mobiloud: "$350/mo forever", natively: "$99/mo forever", diy: "$0 + weeks" },
  { feature: "You own the app", publishd: true, mobiloud: false, natively: "partial", diy: true },
  { feature: "Handles rejections", publishd: true, mobiloud: true, natively: false, diy: false },
  { feature: "1-to-1 human support", publishd: true, mobiloud: false, natively: false, diy: false },
  { feature: "Subscription lock-in", publishd: false, mobiloud: "Forever", natively: "Forever", diy: false },
  { feature: "Time to live", publishd: "7–14 days", mobiloud: "14–21 days", natively: "7–14 days", diy: "4–8 weeks" },
  { feature: "Tool-agnostic", publishd: true, mobiloud: "partial", natively: "partial", diy: true },
];
