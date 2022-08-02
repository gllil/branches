import { For, Show } from "solid-js";
import useStore from "../hooks/useStore";

const HouseholdList = () => {
  const { user, houseHoldMembers, householdDetails } = useStore();

  const members = houseHoldMembers()?.filter(
    (member) => member.id !== user().id
  );
  console.log(householdDetails(), members);
  return (
    <div>
      <Show when={members?.length}>
        <div class="w-full flex justify-center">
          <table class="table-auto border-separate border border-slate-500 my-5 mx-auto">
            <caption class="font-bold text-center text-lg">
              Household Members
            </caption>
            <thead>
              <tr>
                <th class="border border-slate-600 px-3">Name</th>
                <th class="border border-slate-600 px-3">Relationship</th>
                <th class="border border-slate-600 px-3">Has App?</th>
              </tr>
            </thead>
            <tbody>
              <For each={members} fallback={<div>Loading...</div>}>
                {(item) => (
                  <tr>
                    <td class="text-center px-3 border border-slate-700">
                      {item.firstName + " " + item.lastName}
                    </td>
                    <td class="text-center px-3 border border-slate-700">
                      {item.relationship
                        ? item.relationship
                        : "Head of Household"}
                    </td>
                    <td class="text-center px-3 border border-slate-700">
                      {item.id ? " ✔️ " : " ❌ "}
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
};

export default HouseholdList;
