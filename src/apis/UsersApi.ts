import UserProfile from '@/Submit/components/UserProfile/UserProfile';
import config from '@/common/config/config';

interface UserDetails {
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}

interface UserProfile extends UserDetails {
  id: string;
}

interface UsersApiClient {
  getUserByEmail: (email: string) => Promise<UserProfile | null>;
  createUser: (userInput: UserDetails) => Promise<UserProfile>;
  updateUserName: (userId: string, fistName: string, lastName: string) => Promise<boolean>;
}

const getUserByEmail = async (email: string): Promise<UserProfile | null> => {
  const { api } = await config;
  const getUserUri = `${api.usersApiUrl}/user?email=${email}`;
  const response = await fetch(getUserUri);
  if (!response) return null;
  const user: UserProfile = await response.json();
  return user;
};

const createUser = async (userInput: UserDetails): Promise<UserProfile> => {
  const { api } = await config;
  const createUserUri = `${api.usersApiUrl}/user`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  };
  const response = await fetch(createUserUri, requestOptions);
  return response.body as unknown as UserProfile;
};

const updateUserName = async (userId: string, firstName: string, lastName: string): Promise<boolean> => {
  const { api } = await config;
  const updateUserUri = `${api.usersApiUrl}/user/${userId}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName }),
  };
  const response = await fetch(updateUserUri, requestOptions);
  return !!response;
};

export const UsersApi: UsersApiClient = {
  getUserByEmail,
  createUser,
  updateUserName,
};

export default UsersApi;
