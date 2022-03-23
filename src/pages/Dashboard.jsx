import { createEffect, createSignal } from "solid-js";
import { auth } from "../../firebase/config";
import optionTree from "../assets/svg/optionTree.svg";
import heartFruit from "../assets/svg/heartFruit.svg";
import "animate.css";
const Dashboard = () => {
  const [currentUser, setCurrentUser] = createSignal(null);
  createEffect(() => {
    setCurrentUser(auth.currentUser);
    console.log(currentUser());
  });
  return (
    <div class="flex-row justify-center items-center h-max">
      <div class="font-conf text-2xl text-center my-7">{`Welcome ${
        currentUser()?.displayName
      }!`}</div>
      <div class="relative h-0 pb-[56.25%] pt-[25px]">
        <div class="absolute top-9 right-[30%] z-10 w-[10%] ">
          <div className="relative h-full w-full flex justify-center items-center heart-fruit cursor-pointer">
            <img src={heartFruit} alt="heart fruit options" />
            <div className="absolute z-20 text-white text-sm lg:text-lg font-semibold font-conf mt-5 ">
              Contacts
            </div>
          </div>
        </div>
        <div class="absolute top-20 left-[30%] z-10 w-[10%]">
          <div className="relative h-full w-full flex justify-center items-center heart-fruit cursor-pointer">
            <img src={heartFruit} alt="heart fruit options" />
            <div className="absolute z-20 text-white text-sm lg:text-lg font-semibold font-conf mt-5 ">
              Events
            </div>
          </div>
        </div>
        <div class="absolute top-44 right-[40%] z-10 w-[10%]">
          <div className="relative h-full w-full flex justify-center items-center heart-fruit cursor-pointer">
            <img src={heartFruit} alt="heart fruit options" />
            <div className="absolute z-20 text-white text-sm lg:text-lg font-semibold font-conf mt-5 ">
              Profile
            </div>
          </div>
        </div>

        <img
          src={optionTree}
          alt="options tree"
          class="absolute top-0 bottom-0 right-0 left-0 h-full w-full"
        />
      </div>
    </div>
  );
};

export default Dashboard;
