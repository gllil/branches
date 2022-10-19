import { useNavigate } from "solid-app-router";
import { createEffect, createSignal, For, Show } from "solid-js";
import useStore from "../hooks/useStore";

const PendingHouseholdList = () => {
  const { user, houseHoldMembers, updateHouseholdMember } = useStore();
  const [members, setMembers] = createSignal();
  createEffect(() => {
    setMembers(
      houseHoldMembers()?.filter(
        (member) => member.id !== user().id && member.accepted === "pending"
      )
    );
  });

  const navigate = useNavigate();

  const approveMember = (member) => {
    updateHouseholdMember(member, { accepted: "accepted" })
      .then(() => {
        console.log("success");
        navigate("/household");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Show when={members()?.length}>
        <div class="w-full flex justify-center">
          <table class="table-auto border-separate border border-slate-500 my-5 mx-auto">
            <caption class="font-bold text-center text-lg text-red-900">
              Pending Request
            </caption>
            <thead>
              <tr>
                <th class="border border-slate-600 px-3">Name</th>
                <th class="border border-slate-600 px-3">Relationship</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <For each={members()} fallback={<div>Loading...</div>}>
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
                    <td>
                      <button
                        class="btn bg-green-800 hover:bg-green-400"
                        onClick={() => approveMember(item)}
                      >
                        Approve
                      </button>
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

export default PendingHouseholdList;
