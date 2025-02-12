
export interface Item {

  name: string;
  supname?: string | null;
  itemClass?: string | null;
  league?: string | null;
  owner?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  categoryId: string | null;
  fee?: string | null;
  rarity?: string | null;
  socket?: string | null;
  imageId?: string | null;
  quality?: string | null;
  energy_shield?: string | null;
  requiresLevel?: string | null;
  int: string | null;
  buff_0_html?: string | null;
  buff_1_html?: string | null;
  buff_2_html?: string | null;
  buff_white_html?: string | null;
  buff_gold_html?: string | null;
  nameBuff?: string | null;
  evasion?: string | null;
  str?: string | null;
  armour?: string | null;
  dex?: string | null;
  energyShield?: string | null;
  physicalDamage?: string | null;
  strikeChange?: string | null;
  attackSeconds?: string | null;
  intBuff?: string | null;
}

export interface ItemWithId extends Item {
  id?: string;
  // image: ItemWithImage
}

export interface ItemWithImage extends ItemWithId {
  image: ItemWithImage
}

export interface ItemWithCategory extends ItemWithId {
  category: Category
}


export interface Category {
  id: number | string;
  title: string
}

export interface CategoryWithItems extends Category {
  items: ItemWithId[]
}

export interface ItemWithImage {
  id: string
  name: string;
  path: string
}

export interface ItemWithCategoryAndImage extends ItemWithCategory {
  image: ItemWithImage
}
