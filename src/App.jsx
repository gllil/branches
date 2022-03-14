import { Route, Routes, useNavigate } from "solid-app-router";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createEffect, createSignal } from "solid-js";
import { auth } from "../firebase/config";

import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import CreateAccount from "./pages/CreateAccount";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = createSignal(null);
  const navigate = useNavigate();
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
      setCurrentUser(userData);
    });
  });

  return (
    <div class="bg-gradient-to-b from-violet-500 min-h-screen bg-fixed relative">
      <Navigation />
      <div class="container mx-auto min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              currentUser() ? (
                <Dashboard />
              ) : (
                navigate("/login", { replace: true })
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
