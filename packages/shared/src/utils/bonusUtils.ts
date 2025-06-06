import { Bonus, User } from "../types/types";
import bonuses from "../data/bonuses-mock-data.json";

export const getEligibleBonuses = (
  user: User | null,
  brand: string
): Bonus[] => {
  if (!user) return [];

  const brandBonuses = bonuses.filter((bonus) => bonus.brand === brand);

  switch (brand) {
    case "cosmoswin":
      return user.isKYCApproved ? brandBonuses : [];

    case "betfinal":
      return brandBonuses;

    default:
      return [];
  }
};
