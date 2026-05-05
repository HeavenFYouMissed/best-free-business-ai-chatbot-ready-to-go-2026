import { CoverNav } from "@/components/cover/CoverNav";

export default function CoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cover-theme">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CoverNav />
      <main id="main">{children}</main>
    </div>
  );
}
