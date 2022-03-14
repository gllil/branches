import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {} from "firebase/app";
import { createContext, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { auth } from "../../firebase/config";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = createSignal(null);
  createEffect(() => {
    const setPersistenceSession = () => {
      let email = "...";
      let password = "...";

      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((err) => console.error(err));
    };
    setPersistenceSession();
    onAuthStateChanged(auth, (userData) => {
      console.log(userData);
      setCurrentUser(userData);
    });
  });
  console.log(currentUser);
  const store = [
    currentUser,
    {
      changeUser() {
        setCurrentUser(currentUser);
      },
    },
  ];
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
