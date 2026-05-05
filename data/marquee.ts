/**
 * Platform marquee contents — no client names, no click-through, no captions.
 * Mix of platform badges + abstract geometric squircle tiles we generate.
 * Shapes are referenced by id; MarqueeTile renders them as pure SVG.
 */

export type MarqueeItemBase = { id: string };
export type MarqueePlatform = MarqueeItemBase & { type: "platform"; kind: "appstore" | "googleplay" };
export type MarqueeTileItem = MarqueeItemBase & {
  type: "tile";
  motif: "rings" | "grid" | "wave" | "orbit" | "bars" | "prism" | "crescent" | "halo" | "mono" | "pulse";
  hue?: number; /* 0-360 */
};

export type MarqueeItem = MarqueePlatform | MarqueeTileItem;

export const marqueeItems: MarqueeItem[] = [
  { id: "p1", type: "platform", kind: "appstore" },
  { id: "t1", type: "tile", motif: "rings", hue: 190 },
  { id: "t2", type: "tile", motif: "grid", hue: 210 },
  { id: "p2", type: "platform", kind: "googleplay" },
  { id: "t3", type: "tile", motif: "wave", hue: 180 },
  { id: "t4", type: "tile", motif: "orbit", hue: 195 },
  { id: "t5", type: "tile", motif: "prism", hue: 205 },
  { id: "p3", type: "platform", kind: "appstore" },
  { id: "t6", type: "tile", motif: "bars", hue: 185 },
  { id: "t7", type: "tile", motif: "crescent", hue: 200 },
  { id: "t8", type: "tile", motif: "halo", hue: 215 },
  { id: "p4", type: "platform", kind: "googleplay" },
  { id: "t9", type: "tile", motif: "mono", hue: 190 },
  { id: "t10", type: "tile", motif: "pulse", hue: 200 },
];
