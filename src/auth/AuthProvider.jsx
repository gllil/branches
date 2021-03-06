import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { children, createContext, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { auth } from "../../firebase/config";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [state, setState] = createStore(null);

  createEffect(() => {
    const setPersistenceSession = () => {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((err) => console.error(err));
    };
    setPersistenceSession();
    onAuthStateChanged(auth, (userData) => {
      setState(userData);
      console.log(currentUser());
    });
  });
  const authContext = { state };

  const c = children(() => props.children);

  return <AuthContext.Provider value={authContext}>{c}</AuthContext.Provider>;
}
