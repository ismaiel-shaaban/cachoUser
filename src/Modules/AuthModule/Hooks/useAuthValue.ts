import useObservableValue from "../../../Hooks/useObservableValue";
import AuthService from "../Services/AuthService";
import { AUTH_STATE } from "../Types/CommonTypes";

function useAuthValue(): AUTH_STATE {
  return useObservableValue(AuthService.authState$);
}

export default useAuthValue;

export const getAuthValue = () => AuthService.authState$.getValue();

export const setAuthValue = (authState: AUTH_STATE) =>
  AuthService.authState$.next(authState);

export const resetAuthValue = () => AuthService.resetAuthValue();
