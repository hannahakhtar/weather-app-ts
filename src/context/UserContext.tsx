import { createContext } from "react";

type UserContextType = {
    username: string
}

export const username: UserContextType = {
    username: "Test"
}

export const UserContext = createContext<UserContextType>(username);

