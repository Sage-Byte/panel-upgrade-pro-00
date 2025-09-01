export type ElectricalSystemOption = "Less than 10 years" | "10-20 years" | "20-30 years" | "30+ years / not sure" | "";

export type ChargingFrequencyOption = "Never (planning to buy EV)" | "A few times a week" | "Daily commuting" | "Multiple times daily" | "Commercial/fleet use" | "";

export type ChargerTypeOption = "Level 1 (120V outlet)" | "Level 2 (240V home charger)" | "Level 3 (DC fast charging)" | "Not sure what I need" | "";

export type PropertyTypeOption = "Single family home" | "Townhouse/Condo" | "Apartment complex" | "Commercial building" | "";

export interface QuizAnswers {
  electricalSystem: ElectricalSystemOption;
  chargingFrequency: ChargingFrequencyOption;
  chargerType: ChargerTypeOption;
  propertyType: PropertyTypeOption;
  garageType?: string;
  currentPanel?: string;
  zip?: string;
  timeline?: "ASAP" | "1-2 weeks" | "1-2 months" | "Exploring options" | "";
}

export type Tier = 1 | 2 | 3;

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
  zip?: string; // postcode moved to form
  consent: boolean;
}
