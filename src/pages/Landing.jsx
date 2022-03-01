import {For } from "solid-js";
import leaves from "../assets/svg/leaves-3.svg";
import LandingPageCard from "../components/LandingPageCard";

const content = ["Connect with all of your family, friends, co-workers, and social groups. All of the branches of your life are in one location to connect with. Use Branches to plan reunions and one-time events and reoccurring activities.", "Update all of your contacts individually & every member keeps their own information current.", "As you connect with your family and friends, new branches will grow through those connections."]

const Landing = () => {
  return (
    <div class=" md:mt-20">
      <div class="mt-10  columns-auto md:columns-2 md:mt-20 md:pt-20 ">
      <div class="mb-10 block md:hidden flex-wrap justify-items-center"><img class="max-w-xs w-3/6 opacity-90 mx-auto my-auto " src={leaves}/></div>
        <div class="ml-2 order-last">
          <h3 class="text-2xl sm:text-4xl font-bold font-conf">Keep Family Contacts Up to Date and Manage Events</h3>
          <h3 class="sm:text-2xl text-lg font-arch mt-5">Connect with all of your family. All of the branches of your life are in one location to connect with. Use Branches to plan reunions and one-time events and reoccurring activities.</h3>
          <button class="place-self-end btn mt-5">Create a free account</button>
        </div>
        <div class="mt-20 hidden md:block flex-wrap justify-items-center sm:mt-0"><img class="opacity-90 md:max-w-sm lg:max-w-md mx-auto my-auto " src={leaves}/></div>
        
      </div>
      <div class="md:flex mt-20 md:columns-3">
        <For each={content}>
          {item => <LandingPageCard content={item} />}
        </For>
      </div>
    </div>
  );
};

export default Landing;
