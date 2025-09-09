import { useMemo } from "react";

const ThankYou = () => {
  const params = new URLSearchParams(window.location.search);
  const name = useMemo(() => params.get("name") || "", [params]);

  return (
    <main>
      <section className="container px-4 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Thank you{name ? `, ${name}` : ""}!</h1>
        <p className="mt-2 text-muted-foreground">Your phone consultation is booked.</p>

        <div className="mt-8 max-w-2xl mx-auto text-left">
          <h2 className="text-xl font-bold mb-4">What to expect next</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
            <li>We'll call you at your scheduled time to review your results and answer questions.</li>
            <li>If it's a good fit, we'll schedule an in-home assessment.</li>
            <li>Have panel access clear and your main breakers reachable.</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default ThankYou;
