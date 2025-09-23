import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const faqs = [
  { q: 'When does it launch?', a: 'Planning to launch the course early 2026!' },
  { q: 'What skill levels?', a: 'Beginners and Intermediates all the way to low-advanced. Strong focus on fundamentals while covering some advanced concepts' },
  { q: 'Equipment needed?', a: 'Nothing but internet and a phone. This course is fully online. You can apply what you learn at your club session or with your friends and see the improvements firsthand' },
  { q: 'Time commitment?', a: 'Flexible and Self paced. You can learn at your own pace, and start/stop whenever you please.' },
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

