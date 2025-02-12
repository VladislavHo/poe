export const uploadImage = async ({ data }: { data: FormData }) => {
  
  try {
    const response = await fetch(`/api/image/upload`, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const image = await response.json();
    return {
      error: null,
      status: 200,
      image
    }
  } catch (error) {
    return {
      error,
      status: 500
    }
  }
};