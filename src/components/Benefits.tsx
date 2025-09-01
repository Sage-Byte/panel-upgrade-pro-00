import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Zap } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import heroPanel from "@/assets/hero-panel-upgrade.jpg";
import garage from "@/assets/interior-ev-garage.jpg";
import kitchen from "@/assets/kitchen-induction.jpg";
import homeOffice from "@/assets/home-office.jpg";

const benefits = [
  {
    title: "Safety & Code",
    desc: "Reduce overheating and nuisance trips, and meet today’s NEC standards.",
    icon: Shield,
  },
  {
    title: "Capacity for What’s Next",
    desc: "Add EV chargers, induction ranges, heat pumps, home office circuits—without juggling breakers.",
    icon: Zap,
  },
  {
    title: "Home Value & Insurance",
    desc: "Modern electrical boosts appraisal confidence and may improve insurability.",
    icon: CheckCircle,
  },
];

const panelImages = [
  { src: heroPanel, alt: "Premium smart electrical panel upgrade" },
  { src: garage, alt: "EV-ready garage subpanel and charging circuit" },
  { src: kitchen, alt: "Induction-ready kitchen electrical upgrade" },
  { src: homeOffice, alt: "Home office circuits on modern panel" },
];

const Benefits = () => {
  return (
    <section className="container px-4 py-12" aria-labelledby="benefits-heading">
      <div className="text-center mb-8">
    <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold">Why upgrade now?</h2>
  </div>
  <div className="mb-8">
    <Carousel className="w-full">
      <CarouselContent>
        {panelImages.map((img, idx) => (
          <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-2">
              <AspectRatio ratio={16/9} className="overflow-hidden rounded-xl border bg-muted">
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious aria-label="Previous panel photo" />
      <CarouselNext aria-label="Next panel photo" />
    </Carousel>
  </div>
  <div className="grid md:grid-cols-3 gap-4">
        {benefits.map(({ title, desc, icon: Icon }) => (
          <Card key={title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 text-accent-foreground">
                  <Icon className="w-5 h-5" />
                </span>
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center">
        <span className="inline-block text-xs rounded-full bg-accent/15 text-accent-foreground px-3 py-1">
          Complete the quiz today and claim $200 OFF your panel upgrade.
        </span>
      </div>
    </section>
  );
};

export default Benefits;
