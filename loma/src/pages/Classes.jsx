import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PageHeader from "../components/PageHeader";

const empty = { title: "", teacher: "", location: "", date: "", time: "" };

export default function Classes() {
  const [classes, setClasses] = useLocalStorage("loma-classes", []);
  const [form, setForm] = useState(empty);

  const upcoming = classes
    .filter((c) => !c.done && new Date(`${c.date}T${c.time || "00:00"}`) >= new Date())
    .sort(
      (a, b) =>
        `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
    );
  const doneOrPast = classes.filter((c) => c.done || new Date(`${c.date}T${c.time || "23:59"}`) < new Date());

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    setClasses((prev) => [...prev, { ...form, id: crypto.randomUUID(), title: form.title.trim(), done: false }]);
    setForm(empty);
  }

  function toggleDone(id) {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  }

  function remove(id) {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  }

  const ClassCard = ({ c, faded }) => (
    <li className={`scroll-card rounded-xl p-4 ${faded ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`font-bold text-scroll ${c.done ? "line-through" : ""}`}>📚 {c.title}</p>
          <p className="mt-1 text-sm text-scroll/60">
            {c.teacher && <>🧑‍🏫 {c.teacher} · </>}
            {c.location && <>📍 {c.location}</>}
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-leaf/25 px-3 py-1 text-xs font-extrabold text-emerald-300">
          {c.date}
          {c.time && ` · ${c.time}`}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs font-bold">
        <button onClick={() => toggleDone(c.id)} className="text-leaf-bright hover:underline">
          {c.done ? "↩︎ Mark as upcoming" : "✔ Attend / Mark done"}
        </button>
        <button onClick={() => remove(c.id)} className="text-red-400 hover:text-red-300">
          ✕ Delete
        </button>
      </div>
    </li>
  );

  return (
    <section className="mx-auto max-w-5xl px-4">
      <PageHeader
        icon="🏫"
        title="Class Schedule"
        tagline="A day spent without studying is a day wasted at the Academy."
      />

      <form onSubmit={handleSubmit} className="scroll-card mb-10 grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
        <input
          className="chakra-input rounded-xl px-4 py-2.5 sm:col-span-2"
          placeholder="Class title (e.g. Advanced Jutsu = Calculus II)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="chakra-input rounded-xl px-4 py-2.5"
          placeholder="Teacher / Professor"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
        />
        <input
          className="chakra-input rounded-xl px-4 py-2.5"
          placeholder="Location / Room"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
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
          Time
          <input
            type="time"
            className="chakra-input rounded-xl px-4 py-2.5"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="rasengan-btn w-full rounded-xl px-6 py-3 uppercase tracking-widest">
            ⚡ Add Class
          </button>
        </div>
      </form>

      <h2 className="mb-4 font-display text-xl font-bold text-leaf-bright">⏳ Upcoming Classes</h2>
      {upcoming.length === 0 ? (
        <p className="mb-8 rounded-xl border border-dashed border-scroll/20 p-4 text-center text-sm text-scroll/50">
          No classes on the horizon — free training time!
        </p>
      ) : (
        <ul className="mb-10 grid gap-4 sm:grid-cols-2">
          {upcoming.map((c) => (
            <ClassCard key={c.id} c={c} />
          ))}
        </ul>
      )}

      {doneOrPast.length > 0 && (
        <>
          <h2 className="mb-4 font-display text-xl font-bold text-scroll/70">🗄 Completed / Past</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {doneOrPast.map((c) => (
              <ClassCard key={c.id} c={c} faded />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
