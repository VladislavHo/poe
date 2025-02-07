"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './AdminForm.module.scss';

type FormData = {
  email: string;
  password: string;
};

const AdminForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Администратор успешно создан!');
      } else {
        alert('Ошибка при создании администратора.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке данных.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.inputField}
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
        <input
          id="password"
          type="password"
          className={styles.inputField}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов',
            },
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      <button type="submit" className={styles.submitButton}>
        Создать администратора
      </button>
    </form>
  );
};

export default AdminForm;