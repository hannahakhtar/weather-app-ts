import { createContext, useState } from "react";

type UserContextType = {
    username: string,
    setUsername: (newUsername: string) => void
}

export const defaultValue: UserContextType = {
    username: "Test",
    setUsername: () => console.log('default')
}

export const UserProvider: React.FC = ({ children }) => {
    const [username, setUsername] = useState("")

    return (
        <UserContext.Provider value={{ username, setUsername }}>
          {children}
        </UserContext.Provider>
      );
}

export const UserContext = createContext<UserContextType>(defaultValue);

