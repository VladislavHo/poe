'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import './setting.scss';
import { Close_SVG } from '../../SVG/SVG';
import { resetPasswordAdmin } from '@/app/api/request/admin';
const ModalSetting = ({ stateModalChangePassword, setStateModalChangePassword }) => {
  const session = useSession();
  const email = session.data?.user?.email;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    // resetPasswordAdmin({ email, oldPassword, newPassword }).then((res) => {
    //   if (res.status === 200) {
    //     setMessage(res.message);
    //   } else {
    //     setError(res.error);
    //   }
    // })

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
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err?.message ?? 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='change-password--window'>
      <div className="change-password">
        <button className='close' onClick={() => setStateModalChangePassword(!stateModalChangePassword)}>
          <Close_SVG />
        </button>
        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button disabled={!oldPassword || !newPassword} type="submit">Change Password</button>
        </form>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

    </div>
  );
};

export default ModalSetting;