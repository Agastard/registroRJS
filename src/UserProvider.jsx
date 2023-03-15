import React, { useState, useContext } from "react";

//Redirect
import { useNavigate } from "react-router";

const userContext = React.createContext();
const userToggleContext = React.createContext();

export function useUserContext() {
  return useContext(userContext);
}

export function useUserToggleContext() {
  return useContext(userToggleContext);
}

export function UserProvider(props) {
  let history = useNavigate()
  const [user, setUser] = useState(null);

  const cambiaLogin = (userToSet) => {
    console.log("cambialogin", userToSet, user)
    //setUser(userToSet);
    if (!userToSet || userToSet?.length <= 0) {
      setUser(null);
      console.log("deleted")
      
    } else {
      setUser(userToSet);
    }
    //history("/")//redirecconamos
  }

  return (
    <userContext.Provider value={user}>
      <userToggleContext.Provider value={cambiaLogin}>
        {props.children}
      </userToggleContext.Provider>
    </userContext.Provider>
  );
}