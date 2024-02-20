import Router from "next/router";
import React, { useLayoutEffect } from "react";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";

function withAuthRoute(WrappedComponent: any) {
  return function Wrapper(props: any) {
    const { loggedIn } = useAuthValue();
    const lastRoute = JSON.parse(String(sessionStorage.getItem("lastRoute")));
    useLayoutEffect(() => {
      if (loggedIn) {
        lastRoute ? Router.replace(lastRoute) : Router?.replace("/");
      }
    }, [loggedIn]);

    return <WrappedComponent {...props} />;
  };
}

export default withAuthRoute;
