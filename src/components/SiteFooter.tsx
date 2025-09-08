const SiteFooter = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} EV Charger Installation Experts. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#quiz" className="hover:underline">EV Charger Quote</a>
          <a href="https://mrelectricmedic.com" className="hover:underline">mrelectricmedic.com</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
