import { QuizAnswers, Tier } from "@/types/quiz";

export function scoreQuiz(a: QuizAnswers): { score: number; tier: Tier } {
  let score = 0;
  // Age
  if (a.age === "20-30") score += 2;
  if (a.age === "30+ / not sure") score += 3;

  // Trips
  if (a.trips === "Monthly") score += 1;
  if (a.trips === "Weekly") score += 2;
  if (a.trips === "Daily") score += 3;

  // Loads (cap +4)
  const loads = new Set(a.loads || []);
  const relevant = [
    "EV charger",
    "Induction range",
    "Heat pump / HVAC",
    "Hot tub / sauna",
    "Solar / battery soon",
  ];
  let loadsScore = 0;
  for (const l of relevant) {
    if (loads.has(l as any)) loadsScore += 1;
  }
  score += Math.min(loadsScore, 4);

  // Home size
  if (a.homeSize === "2500-4000") score += 1;
  if (a.homeSize === "4000+") score += 2;

  let tier: Tier = 1;
  if (score >= 7) tier = 3; // Upgrade Recommended
  else if (score >= 4) tier = 2; // Consider Upgrade

  return { score, tier };
}
