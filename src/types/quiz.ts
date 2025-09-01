export type AgeOption = "<10" | "10-20" | "20-30" | "30+ / not sure" | "";

export type TripsOption = "Never" | "A few times a year" | "Monthly" | "Weekly" | "Daily" | "";

export type LoadOption = "EV charger" | "Home office circuits" | "Heat pump / HVAC" | "Induction range" | "Hot tub / sauna" | "Solar / battery soon" | "Other";

export type HomeSizeOption = "<1500" | "1500-2500" | "2500-4000" | "4000+" | "";

export interface QuizAnswers {
  age: AgeOption;
  trips: TripsOption;
  loads: LoadOption[];
  homeSize: HomeSizeOption;
  sqFtDetail?: string;
  panelPhoto?: string; // base64 or url
  zip?: string;
  timeline?: "ASAP" | "30–60 days" | "Exploring budget" | "";
}

export type Tier = 1 | 2 | 3;

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
  zip?: string; // postcode moved to form
  consent: boolean;
}
