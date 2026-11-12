import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PageHeader from "../components/PageHeader";

const empty = { name: "", subject: "", date: "", score: "" };

export default function Test() {
  const [tests, setTests] = useLocalStorage("loma-tests", []);
  const [form, setForm] = useState(empty);

  const upcoming = tests
    .filter((t) => t.date && new Date(t.date + "T23:59:59") >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = tests
    .filter((t) => !(t.date && new Date(t.date + "T23:59:59") >= new Date()))
    .sort((a, b) => b.date.localeCompare(a.date));

  const avgScore = past.filter((t) => t.score !== "").length
    ? (
        past.reduce((s, t) => s + Number(t.score), 0) /
        past.filter((t) => t.score !== "").length
      ).toFixed(1)
    : null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.date) return;
    setTests((prev) => [
      ...prev,
      { ...form, id: crypto.randomUUID(), name: form.name.trim(), subject: form.subject.trim() },
    ]);
    setForm(empty);
  }

  function remove(id) {
    setTests((prev) => prev.filter((t) => t.id !== id));
  }

  const daysUntil = (dateStr) => {
    const d = Math.ceil(
      (new Date(dateStr + "T00:00:00") - new Date().setHours(0, 0, 0, 0)) / 86400000
    );
    return d === 0 ? "Today!" : d === 1 ? "Tomorrow" : `in ${d} days`;
  };

  return (
    <section className="mx-auto max-w-5xl px-4">
      <PageHeader
        icon="📝"
        title="Test Arena"
        tagline="Those who break the rules are scum, but those who abandon their studies are worse than scum."
      />

      {/* Entry form */}
      <form onSubmit={handleSubmit} className="scroll-card mb-10 grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
        <input
          className="chakra-input rounded-xl px-4 py-2.5"
          placeholder="Test name (e.g. Midterm Physics)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="chakra-input rounded-xl px-4 py-2.5"
          placeholder="Subject (optional)"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wide text-scroll/60">
          Date
          <input
            type="date"
            className="chakra-input rounded-xl px-4 py-2.5"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wide text-scroll/60">
          Score (leave blank if upcoming)
          <input
            type="number"
            min="0"
            max="1000"
            step="any"
            className="chakra-input rounded-xl px-4 py-2.5"
            placeholder="e.g. 87"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })}
          />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="rasengan-btn w-full rounded-xl px-6 py-3 uppercase tracking-widest">
            ⚡ Register Mission
          </button>
        </div>
      </form>

      {/* Upcoming */}
      <h2 className="mb-4 font-display text-xl font-bold text-leaf-bright">⏳ Upcoming Tests</h2>
      {upcoming.length === 0 ? (
        <p className="mb-8 rounded-xl border border-dashed border-scroll/20 p-4 text-center text-sm text-scroll/50">
          No upcoming tests — train in the library instead.
        </p>
      ) : (
        <ul className="mb-10 grid gap-4 sm:grid-cols-2">
          {upcoming.map((t) => (
            <li key={t.id} className="scroll-card rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-scroll">{t.name}</p>
                  {t.subject && <p className="text-xs uppercase tracking-wide text-rank">{t.subject}</p>}
                </div>
                <span className="rounded-full bg-blood/20 px-3 py-1 text-xs font-extrabold text-red-300">
                  {daysUntil(t.date)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-scroll/60">
                <span>📅 {t.date}</span>
                <button onClick={() => remove(t.id)} className="text-xs font-bold text-red-400 hover:text-red-300">
                  ✕ Dismiss
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Past */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-sage">🏆 Past Missions & Scores</h2>
        {avgScore && (
          <span className="rounded-full bg-sage/20 px-3 py-1 text-xs font-extrabold text-purple-200">
            Average: {avgScore}
          </span>
        )}
      </div>
      {past.length === 0 ? (
        <p className="rounded-xl border border-dashed border-scroll/20 p-4 text-center text-sm text-scroll/50">
          No completed tests yet. Your legend starts with the first entry!
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {past.map((t) => (
            <li key={t.id} className="scroll-card rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-scroll">{t.name}</p>
                  {t.subject && <p className="text-xs uppercase tracking-wide text-rank">{t.subject}</p>}
                </div>
                {t.score !== "" && (
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-black ${
                      Number(t.score) >= 75
                        ? "bg-leaf/30 text-emerald-300"
                        : Number(t.score) >= 50
                        ? "bg-rank/20 text-amber-300"
                        : "bg-blood/25 text-red-300"
                    }`}
                  >
                    {t.score}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-scroll/60">
                <span>📅 {t.date}</span>
                <button onClick={() => remove(t.id)} className="text-xs font-bold text-red-400 hover:text-red-300">
                  ✕ Dismiss
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
