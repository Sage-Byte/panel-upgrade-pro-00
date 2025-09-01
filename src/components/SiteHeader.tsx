
import electricMedicLogo from "@/assets/electric-medic-logo.webp";

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-transparent">
      <nav className="container flex items-center justify-center px-4 py-4" aria-label="Main">
        <a href="/" className="inline-flex items-center gap-2" aria-label="Electric Medic home">
          <img
            src={electricMedicLogo}
            alt="Electric Medic - Electrical Services Columbus"
            width="200"
            height="60"
            loading="eager"
            decoding="async"
            className="h-12 sm:h-14 w-auto"
          />
        </a>
      </nav>
    </header>
  );
}
