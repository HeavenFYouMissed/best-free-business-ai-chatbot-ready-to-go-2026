import { ChatWidget } from "@/components/chat/ChatWidget";
import { StickyNav } from "@/components/nav/StickyNav";

export default function CoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <StickyNav />
      <main id="main">{children}</main>
      {/* Homepage hides the FAB to avoid colliding with the mobile sticky
          CTA + the bottom Spline scene. The chat is still mounted (panel
          listens for the publishd:open-chat event), and the StickyNav's
          AI button on `/` fires that event. */}
      <ChatWidget hideFab />
    </>
  );
}
