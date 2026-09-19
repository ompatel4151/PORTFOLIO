export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-3 px-6 py-10 font-mono text-xs text-muted md:flex-row md:items-center md:px-8">
        <p>
          <span className="text-accent">{"//"}</span> © {year} · built with
          next.js &amp; tailwind
        </p>
        <p>designed &amp; developed from scratch</p>
      </div>
    </footer>
  );
}
