import { LenisProvider } from "@/components/ui/LenisProvider";
import { LenisDriver } from "@/components/motion/GsapProvider";
import { Grain } from "@/components/ui/Grain";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { StickyNav } from "@/components/nav/StickyNav";
import { Footer } from "@/components/sections/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { PremiumPreloader } from "@/components/preloader/PremiumPreloader";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ShipEasterEgg } from "@/components/ui/ShipEasterEgg";

export default function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LenisProvider>
        <LenisDriver>
          <PremiumPreloader />
          <Grain />
          <CursorGlow />
          <StickyNav />
          <main id="main">{children}</main>
          <Footer />
          <ChatWidget />
          <CommandPalette />
          <ShipEasterEgg />
        </LenisDriver>
      </LenisProvider>
    </>
  );
}
