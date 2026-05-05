"use client";

import { Printer } from "lucide-react";

export function PrintChecklistButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn--glass">
      <Printer className="icon" aria-hidden="true" />
      Print checklist
    </button>
  );
}
