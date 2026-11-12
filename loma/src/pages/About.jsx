import PageHeader from "../components/PageHeader";
import Sharingan from "../components/Sharingan";

const features = [
  { icon: "📝", name: "Test Arena", desc: "Track upcoming tests and archive past scores with rank-colored badges." },
  { icon: "🏫", name: "Class Schedule", desc: "Never miss a lecture — log time, teacher and room for every class." },
  { icon: "🎯", name: "Events & Tasks", desc: "A mission board for your D-Rank chores up to S-Rank events." },
  { icon: "🍜", name: "Expenses & Savings Projector", desc: "Log daily spending and project whether you'll hit your monthly savings goal." },
];

export default function About() {
  return (
    <section className="mx-auto max-w-4xl px-4">
      <PageHeader
        icon="🍃"
        title="About Loma"
        tagline="Hard work is worthless for those that don't believe in themselves."
      />

      <div className="scroll-card mb-8 flex flex-col items-center gap-4 rounded-2xl p-8 text-center">
        <Sharingan size={72} />
        <h2 className="font-display text-3xl font-black tracking-widest text-foil">LOMA</h2>
        <p className="max-w-2xl leading-relaxed text-scroll/80">
          Loma is your student academic helper, built with{" "}
          <b className="text-rank">React</b> + <b className="text-rank">Vite</b> and styled with{" "}
          <b className="text-rank">Tailwind CSS</b>, wrapped in a{" "}
          <b className="text-blood">Naruto</b> <b className="text-sage">Shippuden</b> theme.
          Everything you enter is stored safely in your own browser (localStorage) — no account,
          no server, just your ninja study scroll.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.name} className="scroll-card rounded-2xl p-5">
            <p className="font-display text-lg font-bold text-rank">
              <span className="mr-2">{f.icon}</span>
              {f.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-scroll/70">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* The requested footer note also shown prominently here */}
      <div className="mt-10 rounded-2xl border-2 border-dashed border-blood/50 bg-blood/10 p-6 text-center">
        <p className="font-display text-xl font-bold text-red-300">Made with QWEN 🧪</p>
        <p className="mt-2 text-sm text-scroll/70">
          This webapp is made using <b className="text-rank">QWEN</b> as a test app.
        </p>
      </div>
    </section>
  );
}
