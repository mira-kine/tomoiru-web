import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { updateUserName } from '../../api/users';

export default function UserInputWelcome() {
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({ userName: '' });

  const handleWelcome = async (e) => {
    e.preventDefault();
    const { userName } = formState;
    try {
      setLoading(true);
      await updateUserName(userName);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleWelcome}>
        <input
          type="text"
          value={formState.userName}
          onChange={handleForm}
          aria-label="name"
          name="userName"
        />
      </form>
    </div>
  );
}
