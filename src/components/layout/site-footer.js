export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-black/5 py-10">
      <div className="shell flex flex-col gap-3 text-sm text-(--ink-500)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mercado. All rights reserved.</p>
        <p>Made with care for shoppers and sellers everywhere.</p>
      </div>
    </footer>
  );
}