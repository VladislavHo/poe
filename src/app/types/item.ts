
export interface Item {

  name: string;
  supname?: string; // Optional
  itemClass?: string; // Optional
  league?: string; // Optional
  owner?: string; // Optional
  description?: string; // Optional
  shortDescription?: string; // Optional
  categoryId: string;
  fee?: string; // Optional
  rarity?: string; // Optional
  itemLevel?: string; // Optional
  imageId?: string
}

export interface ItemWithId extends Item {
  id?: string;
  image: ItemWithImage
}

export interface ItemWithImage {
  id: string
  name: string;
  path: string
}


