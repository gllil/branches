import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "solid-app-router";
import { createEffect, createSignal } from "solid-js";
import { auth } from "../../firebase/config";
import branchesLogo from "../assets/logos/Branches.png";
const Navigation = () => {
  const [currentUser, setCurrentUser] = createSignal(null);
  const navigate = useNavigate();
  createEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("./login", { replace: true });
      })
      .catch((err) => console.error(err));
  };
  return (
    <div class="container mx-auto columns-2">
      <div class="flex justify-start sm:mt-2 items-center">
        {/* <h3 class="text-4xl font-bold font-arch ml-2">Branches</h3> */}
        <a href={currentUser() ? "/dashboard" : "/"}>
          <img
            src={branchesLogo}
            alt="branches logo"
            class="w-48 md:w-60 cursor-pointer"
          />
        </a>
      </div>
      <div class="flex justify-end items-center ">
        {currentUser() ? (
          <button
            type="button"
            class="btn mt-2 mr-2 text-sm sm:text-base"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            class="btn mt-2 mr-2 text-sm sm:text-base"
            onClick={() => (location.href = "/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
