import MotionInView from './MotionInView';

export default function Coach() {
  return (
    <section id="coach" className="py-20">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <MotionInView>
          <div className="aspect-square rounded-2xl glass shadow-soft overflow-hidden flex items-center justify-center">
            <span className="text-mutedForeground">Coach photo</span>
          </div>
        </MotionInView>
        <MotionInView>
          <div>
            <h2 className="text-3xl font-semibold">Meet Your Coach</h2>
            <p className="mt-4 text-mutedForeground">
              Level 2 certified coach; county level; plays on national circuit and local leagues;
              previously Adidas-sponsored. I’ve helped hundreds of players build strong foundations
              and find joy in the sport.
            </p>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

