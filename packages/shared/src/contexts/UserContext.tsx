"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../src/types/types";
import userData from "../data/user-mock-data.json";

interface UserContextType {
  user: User | null;
  login: (username: string) => Promise<boolean>;
  deposit: (amount: number) => void;
  checkUsernameExists: (username: string) => Promise<boolean>;
   clearUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const checkUsernameExists = async (username: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return userData.some((user: User) => user.username === username);
  };

  const login = async (username: string): Promise<boolean> => {
    try {
      const searchUser = userData.find(
        (user: User) => user.username === username
      );
      if (searchUser) {
        setUser(searchUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const deposit = (amount: number) => {
    if (!user) return;

    setUser({
      ...user,
      depositCount: user.depositCount + 1,
      currentBalance: user.currentBalance + amount,
    });
  };

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        deposit,
        checkUsernameExists,
        clearUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
