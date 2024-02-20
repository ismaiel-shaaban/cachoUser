import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any | null>(null);

function AuthContextProvider(props: any) {
  const { children } = props;
  const [loading,setLoading]=useState<boolean>(true)
  const [loggedIn,setLoggedIn]=useState<boolean>(false)
  const [user,setUser]=useState(null)
  useEffect(()=>{
    try{
      const token=localStorage.getItem("token")
      const _user=localStorage.getItem("user")
      if(token!==null && _user!==null)
      {
        setLoggedIn(true)
        const user=JSON.parse(_user)
        setUser(user)
      }
  }catch(error:any){

  }finally{
    setLoading(false)
  }

  },[])
  return <AuthContext.Provider value={{loggedIn,setLoggedIn,user,setUser}}>
    {loading?(<>LoadingData...</>):
    (children)}
    </AuthContext.Provider>
}

export default AuthContextProvider;
