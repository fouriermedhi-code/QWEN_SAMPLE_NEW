import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PageHeader from "../components/PageHeader";

const empty = { title: "", type: "Event", date: "", notes: "" };

export default function Events() {
  const [events, setEvents] = useLocalStorage("loma-events", []);
  const [form, setForm] = useState(empty);

  const upcoming = events
    .filter((e) => !e.done && (!e.date || new Date(e.date + "T23:59:59") >= new Date()))
    .sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
  const finished = events.filter((e) => e.done);

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!form.title.trim()) return;
    setEvents((prev) => [
      ...prev,
      { ...form, id: crypto.randomUUID(), title: form.title.trim(), notes: form.notes.trim(), done: false },
    ]);
    setForm(empty);
  }

  function toggleDone(id) {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e)));
  }

  function remove(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <section className="mx-auto max-w-5xl px-4">
      <PageHeader
        icon="🎯"
        title="Events & Tasks"
        tagline="When you have the will to protect something, you can truly become strong."
      />

      <form onSubmit={handleSubmit} className="scroll-card mb-10 grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
        <input
          className="chakra-input rounded-xl px-4 py-2.5"
          placeholder="Title (e.g. Science Fair / Submit essay)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <select
          className="chakra-input rounded-xl px-4 py-2.5"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Event</option>
          <option>Task</option>
        </select>
        <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wide text-scroll/60">
          Date (optional)
          <input
            type="date"
            className="chakra-input rounded-xl px-4 py-2.5"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </label>
        <input
          className="chakra-input rounded-xl px-4 py-2.5"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <div className="sm:col-span-2">
          <button type="submit" className="rasengan-btn w-full rounded-xl px-6 py-3 uppercase tracking-widest">
            ⚡ Add to Mission Board
          </button>
        </div>
      </form>

      <h2 className="mb-4 font-display text-xl font-bold text-leaf-bright">🗺 Upcoming Missions (D-Rank → S-Rank)</h2>
      {upcoming.length === 0 ? (
        <p className="rounded-xl border border-dashed border-scroll/20 p-4 text-center text-sm text-scroll/50">
          The mission board is empty. Register your first event or task above!
        </p>
      ) : (
        <ul className="grid gap-4">
          {upcoming.map((e) => (
            <li key={e.id} className="scroll-card flex items-start justify-between gap-4 rounded-xl p-4">
              <div>
                <p className="font-bold text-scroll">
                  {e.type === "Event" ? "🎪" : "✅"} {e.title}
                </p>
                <p className="mt-1 text-sm text-scroll/60">
                  {e.date && <>📅 {e.date} · </>}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                      e.type === "Event" ? "bg-sage/25 text-purple-200" : "bg-foil/20 text-amber-300"
                    }`}
                  >
                    {e.type}
                  </span>
                  {e.notes && <> · {e.notes}</>}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 text-xs font-bold">
                <button
                  onClick={() => toggleDone(e.id)}
                  className="rounded-full bg-leaf/25 px-3 py-1 text-emerald-300 hover:bg-leaf/40"
                >
                  ✔ Complete
                </button>
                <button onClick={() => remove(e.id)} className="text-red-400 hover:text-red-300">
                  ✕ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {finished.length > 0 && (
        <>
          <h2 className="mb-4 mt-10 font-display text-xl font-bold text-scroll/70">🏁 Completed Missions</h2>
          <ul className="grid gap-3">
            {finished.map((e) => (
              <li key={e.id} className="scroll-card flex items-center justify-between rounded-xl p-3 opacity-70">
                <span className="text-scroll/70 line-through">
                  {e.type === "Event" ? "🎪" : "✅"} {e.title} {e.date && `· ${e.date}`}
                </span>
                <div className="flex gap-3 text-xs font-bold">
                  <button onClick={() => toggleDone(e.id)} className="text-rank hover:underline">
                    ↩︎ Reopen
                  </button>
                  <button onClick={() => remove(e.id)} className="text-red-400 hover:text-red-300">
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
