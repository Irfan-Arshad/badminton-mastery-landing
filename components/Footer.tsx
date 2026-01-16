export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10 mt-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-mutedForeground">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 rounded-md bg-lime-400/90 text-slate-900 items-center justify-center font-bold">B</span>
          <span>Badminton Mastery</span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Instagram</a>
        </div>
        <div className="text-white/60">© {new Date().getFullYear()} Badminton Mastery</div>
      </div>
    </footer>
  );
}
