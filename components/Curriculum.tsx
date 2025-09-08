import { BookOpen, Hand, Footprints, Sword, Goal, Brain, AlertTriangle, Wand2, Compass } from 'lucide-react';
import MotionInView from './MotionInView';

const modules = [
  { icon: BookOpen, title: 'Intro & Equipment, Rules' },
  { icon: Hand, title: 'Grips: forehand, backhand, panhandle, bevel' },
  { icon: Footprints, title: 'Movement & Footwork' },
  { icon: Sword, title: 'Key Shots: clear, drop, smash, net' },
  { icon: Goal, title: 'Serve & Return (singles/doubles)' },
  { icon: Brain, title: 'Game Strategies' },
  { icon: Brain, title: 'Mental & Physical Conditioning' },
  { icon: AlertTriangle, title: 'Common Mistakes + Fixes' },
  { icon: Wand2, title: 'Advanced Insights: deception, tempo, anticipation' },
  { icon: Compass, title: 'Beyond Fundamentals: styles, tracking progress' },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="py-20">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">What You’ll Learn</h2>
          <p className="text-mutedForeground mt-2 max-w-2xl">
            A structured curriculum with concise lessons and practical drills, designed for steady
            progress.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <MotionInView key={m.title} delay={i * 0.05}>
              <div className="group rounded-2xl glass p-5 transition-transform hover:-translate-y-1 hover:shadow-soft">
                <m.icon className="h-6 w-6 text-emerald-400" />
                <div className="mt-3 font-medium">{m.title}</div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

