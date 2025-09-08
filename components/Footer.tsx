export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10 mt-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-mutedForeground">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 rounded-md bg-emerald-400/90 text-emerald-950 items-center justify-center font-bold">🏸</span>
          <span>Badminton Mastery</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <div>© {new Date().getFullYear()} Badminton Mastery</div>
      </div>
    </footer>
  );
}

