// pages/auth/signin.tsx
"use client";
import { signIn, useSession } from 'next-auth/react';
import { FormEventHandler, useEffect } from 'react';
import styles from './AdminForm.module.scss';

const SignIn = () => {
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      window.location.href = "/dashboard";
    }
  }, [session]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: "/dashboard",
   
    });

  };
  return (
    <div>
      {
        session && <>
          <form
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input className={styles.inputField} type="text" name="email" placeholder="Email" required />
            <label htmlFor="email" className={styles.label}>
              Пароль
            </label>
            <input className={styles.inputField} type="password" name="password" placeholder="Пароль" required />
            <button className={styles.submitButton} type="submit">Войти</button>
          </form>
        </>
      }

    </div>
  );

};

export default SignIn;