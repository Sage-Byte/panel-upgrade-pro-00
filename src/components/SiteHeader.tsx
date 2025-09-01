

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-transparent">
      <nav className="container flex items-center justify-center px-4 py-4" aria-label="Main">
        <a href="/" className="inline-flex items-center gap-2" aria-label="AtoZ Electrical Service home">
          <img
            src="/lovable-uploads/6d370bf3-cf54-416a-b2ec-edd6f1fdb2f2.png"
            alt="AtoZ Electrical Service logo"
            width="220"
            height="64"
            loading="eager"
            decoding="async"
            className="h-12 sm:h-14 w-auto"
          />
        </a>
      </nav>
    </header>
  );
}
