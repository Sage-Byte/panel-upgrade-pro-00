import { useMemo } from "react";
import evImg from "@/assets/interior-ev-garage.jpg";
import kitchenImg from "@/assets/kitchen-induction.jpg";
import officeImg from "@/assets/home-office.jpg";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  const params = new URLSearchParams(window.location.search);
  const name = useMemo(() => params.get("name") || "", [params]);

  return (
    <main>
      <section className="container px-4 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Thank you{name ? `, ${name}` : ""}!</h1>
        <p className="mt-2 text-muted-foreground">Your phone consultation is booked.</p>

        <div className="mt-6 grid md:grid-cols-2 gap-4 items-center">
          <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center px-6">
              <div className="mb-3 text-sm font-medium">Personalized video</div>
              <p className="text-sm text-muted-foreground">
                “Thanks for booking your electrical consultation. I’ve reviewed your quiz results and I’m excited to discuss solutions that could really benefit your home.”
              </p>
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold mb-2">What to expect next</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>We’ll call you at your scheduled time to review your results and answer questions.</li>
              <li>If it’s a good fit, we’ll schedule an in-home assessment.</li>
              <li>Have panel access clear and your main breakers reachable.</li>
            </ul>
            <p className="mt-3 text-sm">Your $200 OFF is reserved under this booking.</p>
            <div className="mt-3 flex gap-2">
              <Button variant="accent">Add to Google</Button>
              <Button variant="outline">Add to Apple</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 pb-12" aria-labelledby="cases-heading">
        <h2 id="cases-heading" className="text-2xl font-bold text-center mb-6">Relevant case studies</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{
            title: "EV-Ready Upgrade",
            img: evImg,
            text: "200A main with garage subpanel; two EV chargers without trips.",
          },{
            title: "Induction + Office Power",
            img: kitchenImg,
            text: "Dedicated range and office circuits; steady power during peak.",
          },{
            title: "Whole-Home Stability",
            img: officeImg,
            text: "Load balancing and labeling reduced nuisance trips by 90%.",
          }].map((c) => (
            <article key={c.title} className="rounded-lg border overflow-hidden">
              <img src={c.img} alt={`${c.title} case study`} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="font-medium">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ThankYou;
