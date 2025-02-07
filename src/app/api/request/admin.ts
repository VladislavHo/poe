export const resetPasswordAdmin = async ({ email, oldPassword, newPassword }: { email: string | null | undefined, oldPassword: string, newPassword: string }) => {
  try {
    const response = await fetch('/api/admin/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, oldPassword, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        message: data.message,
        status: 200
      }
    } else {
      return {
        error: data.error,
        status: 401
      }
    }
  } catch (error) {
    return {
      error,
      status: 500
    }
  }
};