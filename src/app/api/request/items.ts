import { Item, ItemWithId } from "@/app/types/item";


export const deleteItems = async (id: string | undefined) => {
  try {
    await fetch(`/api/items/delete?id=${id}`, {
      method: 'DELETE',
    });

    return {
      error: null,
      status: 200
    }
  } catch (error) {
    return {
      error,
      status: 500
    }
  }
};


export const getItems = async () => {
  try {
    const response = await fetch('/api/items');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    return {
      error: null,
      items: data,
      status: response.status
    };
  } catch (error) {
    return {
      error,
      items: null,
      status: 500
    }
  }
};
export const getItem = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`/api/items?id=${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return {
      error: null,
      item: data,
      status: response.status
    };
  } catch (error) {
    return {
      error,
      item: null,
      status: 500
    }
  }
};


export const editItems = async ({ data }: { data: ItemWithId }) => {
  try {
    await fetch(`/api/items/edit?id=${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });

    return {
      error: null,
      status: 200
    }
  } catch (error) {
    return {
      error,
      status: 500
    }
  }
};

export const createItem = async ({ data }: { data: Item }) => {
  try {
    await fetch(`/api/items/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return {
      error: null,
      status: 200
    }
  } catch (error) {
    return {
      error,
      status: 500
    }
  }
};




