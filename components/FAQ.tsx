import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const faqs = [
  { q: 'When does it launch?', a: 'Targeting Q4 this year. Join the waitlist for updates.' },
  { q: 'What skill levels?', a: 'Beginners to low-advanced. Strong focus on fundamentals.' },
  { q: 'Equipment needed?', a: 'A racket, shuttlecocks, and access to a court.' },
  { q: 'Time commitment?', a: 'Short, focused lessons and drills you can fit in weekly.' },
  { q: 'Refund policy?', a: 'A fair refund policy applies at launch.' },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16">
      <div className="container">
        <h2 className="text-3xl font-semibold mb-6">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

