import { For, Show } from "solid-js";
import useStore from "../hooks/useStore";

const HouseholdList = () => {
  const { user, houseHoldMembers } = useStore();
  console.log(houseHoldMembers());
  return (
    <Show when={houseHoldMembers()?.length}>
      <table class="table-fixed my-5 mx-auto">
        <caption class="font-bold text-center text-lg">
          Household Members
        </caption>
        <thead>
          <tr>
            <th>Has App?</th>
            <th>Name</th>
            <th>Relationship</th>
          </tr>
        </thead>
        <tbody>
          <For each={houseHoldMembers()} fallback={<div>Loading...</div>}>
            {(item) => (
              <tr>
                <td class="text-center">{item.isMember ? " ✔️ " : " ❌ "}</td>
                <td>{item.firstName + " " + item.lastName}</td>
                <td class="text-right">{item.relationship}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Show>
  );
};

export default HouseholdList;
