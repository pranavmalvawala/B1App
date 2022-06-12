import React from "react"
import { PersonHelper } from "./appBase/helpers";
import { UserContextInterface } from "./appBase/interfaces";

const UserContext = React.createContext<UserContextInterface | undefined>(undefined);
interface Props { children: React.ReactNode; }

export const UserProvider = ({ children }: Props) => {
  const [userName, setUserName] = React.useState("");
  const [churchName, setChurchName] = React.useState("");
  //const [profilePicture, setProfilePicture] = React.useState(PersonHelper.getPhotoUrl(null));
  const [profilePicture, setProfilePicture] = React.useState("");

  return <UserContext.Provider value={{ userName, setUserName, churchName, setChurchName, profilePicture, setProfilePicture }}>{children}</UserContext.Provider>
};

export default UserContext;

