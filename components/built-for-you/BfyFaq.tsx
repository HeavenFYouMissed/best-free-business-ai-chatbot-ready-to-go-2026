import { Faq } from "@/components/sections/Faq";
import { builtForYouFaq } from "@/data/builtForYouFaq";

export function BfyFaq() {
  return (
    <Faq
      sectionId="faq"
      index="06"
      label="FAQ"
      heading="Questions."
      entries={builtForYouFaq}
    />
  );
}

export default BfyFaq;
