import MotionInView from './MotionInView';
import { Button } from './ui/button';

export default function PricingTeaser() {
  return (
    <section className="py-16">
      <div className="container">
        <MotionInView>
          <div className="rounded-2xl glass p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Join the waitlist for an exclusive launch discount.</h3>
              <p className="text-mutedForeground mt-2">Early-bird benefits. Limited-time pricing at launch.</p>
            </div>
            <a href="#signup"><Button size="lg">Get Notified</Button></a>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

