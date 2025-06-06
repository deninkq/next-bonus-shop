export interface User {
  username: string;
  depositCount: number;
  registrationDate: string;
  country: string;
  isKYCApproved: boolean;
  currentBalance: number;
}

export interface Bonus {
  brand: "cosmoswin" | "betfinal" | string;
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  requiresKYC: boolean;
  depositCountMin?: number;
  depositCountMax?: number;
  registrationWithinLastDays?: number;
  availableCountries?: string[];
  balanceMustBeZero?: boolean;
}
