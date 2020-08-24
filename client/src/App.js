import React, { useState,useEffect } from "react";
import "./App.css";
import Cookie from 'js-cookie';
import GlobalState from "./utils/GlobalState";

import Locker from "./components/Locker";
import Dashboard from "./components/Dashboard";

import Time from "./components/Time";

function App() {
  // Variable
  const [hasAccount, setHasAccount] = useState(true);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  const [client, setClient] = useState({});
  // Function
  const readCookie=()=>{
    if(Cookie.get('auth')){
        setAuth(true);
    }
    setUser(Cookie.get('user'))
  }
  
  useEffect(() => {
    readCookie()
  }, [auth])


  return (
    <GlobalState.Provider
      value={{ 
         hasAccount: hasAccount, setHasAccount,
         auth: auth, setAuth,
         user:user, setUser,
         client:client, setClient }}
    >
      <div className="container">
        {/* show real time */}
        <Time />
        <div>
          {/* show locker */}
          <Locker />
        </div>
      </div>
    </GlobalState.Provider>
  );
}

export default App;
