import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { updateUserName } from '../../api/users';
import { useUser } from '../../context/UserProvider';

export default function UserInputWelcome() {
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({ userName: '' });
  const { currentUser, updateUserData } = useUser();

  const handleWelcome = async (e) => {
    e.preventDefault();
    const { userName } = formState;
    try {
      setLoading(true);
      await updateUserName(userName, currentUser.id);
      // update local storage user data with userName
      updateUserData(userName);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  console.log('currentUser', currentUser);
  console.log('formState', formState);
  if (loading) {
    <p>Loading...</p>;
  }

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
