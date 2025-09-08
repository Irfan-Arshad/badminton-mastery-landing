import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WaitlistStat from '../components/WaitlistStat';
import Curriculum from '../components/Curriculum';
import Coach from '../components/Coach';
import ValueProps from '../components/ValueProps';
import Testimonials from '../components/Testimonials';
import PricingTeaser from '../components/PricingTeaser';
import FAQ from '../components/FAQ';
import SignupForm from '../components/SignupForm';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <section className="py-8">
          <div className="container">
            <WaitlistStat />
          </div>
        </section>
        <Curriculum />
        <Coach />
        <ValueProps />
        <Testimonials />
        <PricingTeaser />
        <FAQ />
        <section id="signup" className="py-20">
          <div className="container">
            <SignupForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

