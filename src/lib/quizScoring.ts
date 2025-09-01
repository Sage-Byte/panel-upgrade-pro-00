import { QuizAnswers, Tier } from "@/types/quiz";

export function scoreQuiz(a: QuizAnswers): { score: number; tier: Tier } {
  let score = 0;
  
  // Electrical system age
  if (a.electricalSystem === "10-20 years") score += 1;
  if (a.electricalSystem === "20-30 years") score += 2;
  if (a.electricalSystem === "30+ years / not sure") score += 3;

  // Charging frequency (higher usage = higher score)
  if (a.chargingFrequency === "A few times a week") score += 1;
  if (a.chargingFrequency === "Daily commuting") score += 2;
  if (a.chargingFrequency === "Multiple times daily") score += 3;
  if (a.chargingFrequency === "Commercial/fleet use") score += 4;

  // Charger type complexity
  if (a.chargerType === "Level 2 (240V home charger)") score += 2;
  if (a.chargerType === "Level 3 (DC fast charging)") score += 4;
  if (a.chargerType === "Not sure what I need") score += 1;

  // Property type installation complexity
  if (a.propertyType === "Townhouse/Condo") score += 1;
  if (a.propertyType === "Apartment complex") score += 2;
  if (a.propertyType === "Commercial building") score += 3;

  let tier: Tier = 1;
  if (score >= 8) tier = 3; // Complex Installation
  else if (score >= 4) tier = 2; // Standard Installation

  return { score, tier };
}