import { For } from "solid-js";
import family from "../assets/images/family.png";
import eventIcon from "../assets/icons/work-schedule.png";
import contactIcon from "../assets/icons/contacts.png";
import mailboxIcon from "../assets/icons/mailbox.png";
import LandingPageCard from "../components/LandingPageCard";

const cardContent = [
  {
    name: "contacts",
    url: contactIcon,
    description: "Keep your family's contact information up to date",
  },
  {
    name: "events",
    url: eventIcon,
    description: "Plan and organize events with family collaboration",
  },
  {
    name: "mailbox",
    url: mailboxIcon,
    description:
      "Easily create labels for birthday, anniversary, & holiday cards",
  },
];

const Landing = () => {
  return (
    <div class=" md:mt-20 mx-2">
      <div class="mt-10  columns-auto md:columns-2 md:mt-20 md:pt-20 ">
        <div class="mb-10 block md:hidden flex-wrap justify-items-center">
          <img
            class="max-w-xs w-3/6 opacity-90 mx-auto my-auto "
            src={family}
            alt="family"
          />
        </div>
        <div class="flex-wrap mx-auto">
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-conf">
            Keep Family Contacts Up to Date and Manage Events
          </h3>
          <h3 class="sm:text-xl text-lg font-conf mt-4">
            Connect with all of your family. All of the branches of your life
            are in one location to connect with. Use Branches to plan reunions
            and one-time events and reoccurring activities.
          </h3>
          <button
            class="place-self-end btn mt-4 text-sm md:text-base"
            onClick={() => (location.href = "/create-account")}
          >
            Create a free account
          </button>
        </div>
        <div class="mt-20 h-max hidden md:block flex-wrap justify-items-center sm:mt-0">
          <img class="opacity-90 lg:max-w-md mx-auto my-auto " src={family} />
        </div>
      </div>
      <div class="md:flex mt-32 md:columns-3">
        <For each={cardContent}>
          {(item) => (
            <LandingPageCard
              content={item.description}
              iconUrl={item.url}
              iconName={item.name}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default Landing;
