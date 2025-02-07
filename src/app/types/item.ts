export interface Item {
  name: string;
  contact?: string;
  league?: string;
  owner?: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  itemClass: string;
  rarity: string;
  fee: number;
  requirements?: string;
  itemLevel: number;
  implicitEffects?: string;
  additionalStatistics?: string;
}