import Sharingan from "./Sharingan";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-rank/25 bg-ink/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center">
        <Sharingan size={30} />
        <p className="font-display text-lg font-bold tracking-widest text-foil">LOMA</p>
        <p className="max-w-md text-sm leading-relaxed text-scroll/70">
          This webapp is made using{" "}
          <span className="font-extrabold text-rank">QWEN</span> as a test app — your
          Naruto Shippuden themed student academic helper. 🍃
        </p>
        <p className="text-xs uppercase tracking-[0.3em] text-scroll/40">
          Believe it! · © {new Date().getFullYear()} Loma
        </p>
      </div>
    </footer>
  );
}
