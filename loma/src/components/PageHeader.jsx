export default function PageHeader({ icon, title, tagline }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="font-display text-4xl font-black uppercase tracking-wider text-rank sm:text-5xl">
        <span className="mr-3">{icon}</span>
        <span className="kunai-underline">{title}</span>
      </h1>
      {tagline && (
        <p className="mx-auto mt-4 max-w-xl text-sm italic leading-relaxed text-scroll/60">
          “{tagline}”
        </p>
      )}
    </div>
  );
}
