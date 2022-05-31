import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { Show, createEffect, createSignal } from "solid-js";
import Login from "../pages/Login";
import { Outlet } from "solid-app-router";

const Protected = () => {
  const [currentUser, setCurrentUser] = createSignal(null);
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
      setCurrentUser(userData);
    });
  });

  return (
    <Show when={currentUser()} fallback={<Login />}>
      <Outlet />
    </Show>
  );
};

export default Protected;
