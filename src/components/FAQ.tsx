const faqs = [
  {
    q: "How long does a panel upgrade take?",
    a: "Most upgrades complete in one day, with permits and inspection included. Larger service changes can take 1–2 days.",
  },
  {
    q: "Do you handle permits and inspection?",
    a: "Yes—permit, inspection, and manufacturer-compliant parts are included.",
  },
  {
    q: "Will my power be off?",
    a: "We plan a short outage window and restore service the same day in most cases.",
  },
  {
    q: "What about older or legacy panels?",
    a: "Some legacy models have documented issues. We’ll verify on-site and recommend safe, code-compliant solutions.",
  },
];

const FAQ = () => {
  return (
    <section className="container px-4 py-12" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-6 divide-y">
          {faqs.map((f) => (
            <details key={f.q} className="py-4">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
