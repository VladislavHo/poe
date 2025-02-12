export const getCategorys = async () => {
  try {
    const response = await fetch('/api/category');
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

export const getCategory = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`/api/category?id=${id}`);
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