
export interface Item {

  description?: string | null;
  className?: string | null;
  categoryId: string | null;
  shortDescription?: string | null;
  owner?: string | null;
  sockets?: string | null;
  fee?: string | null;
  int: string | null;

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
  id: string;
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
