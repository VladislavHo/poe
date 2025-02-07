

export const deleteItems = async (id: string | undefined) => {
  try {
    await fetch(`/api/items/delete?id=${id}`, {
      method: 'DELETE',
    });
    getItems();
  } catch (error) {
    console.log(error);
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


export const editItems = async (id: number) => {
  try {
    await fetch(`/api/items/edit/${id}`, {
      method: 'PUT',
    });
    getItems();
  } catch (error) {
    return {
      error,
      status: 500
    }
  }
};

