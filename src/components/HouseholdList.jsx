import { For, Show } from "solid-js";
import useStore from "../hooks/useStore";

const HouseholdList = () => {
  const { user } = useStore();
  return (
    <Show when={user()?.household}>
      <div class="my-5">
        <div class="font-bold flex justify-center text-lg">
          Household Members:{" "}
        </div>
        <For each={user().household} fallback={<div>Loading...</div>}>
          {(item) => (
            <div class="text-center">
              {item.firstName + " " + item.lastName + " | " + item.relationship}
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};

export default HouseholdList;
