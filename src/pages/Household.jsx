import { useNavigate } from "solid-app-router";
import { createEffect, createSignal, Match, onMount, Switch } from "solid-js";
import { Show } from "solid-js/web";
import { auth } from "../../firebase/config";
import HouseholdSelect from "../components/HouseholdSelect";
import ManageHousehold from "../components/ManageHousehold";
import useStore from "../hooks/useStore";

const Household = () => {
  const {
    user,
    updateUserData,
    activeButton,
    setActiveButton,
    householdDetails,
  } = useStore();
  const [openJoinHouseHold, setOpenJoinHouseHold] = createSignal(false);
  const [openCreateHouseHold, setOpenCreateHouseHold] = createSignal(false);
  const [success, setSuccess] = createSignal(null);
  const [error, setError] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [file, setFile] = createSignal(null);
  const [address, setAddress] = createSignal(null);
  const [addressFormData, setAddressFormData] = createSignal(null);
  const [userAddress, setUserAddress] = createSignal(null);

  const navigate = useNavigate();
  return (
    <div>
      <div class="w-full flex justify-start mt-3">
        <button
          class=" w-20 flex justify-center items-center font-semibold text-lg"
          onClick={() => navigate("/dashboard")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
      <div class="flex-row justify-center align-middle text-center container mx-auto w-full">
        <Show
          when={user()?.household}
          fallback={
            <HouseholdSelect
              setOpenCreateHouseHold={setOpenCreateHouseHold}
              setOpenJoinHouseHold={setOpenJoinHouseHold}
            />
          }
        >
          <div class="flex justify-center my-12">
            <div class="text-left w-max font-conf font-bold">
              <div class="font-bold text-xl mb-2">Household Address</div>
              <div>{householdDetails()?.address?.address1}</div>
              <div>
                {householdDetails()?.address?.address2 &&
                  householdDetails()?.address?.address2}
              </div>
              <div>
                {householdDetails()?.address?.city &&
                  householdDetails()?.address?.city + ", "}
                {}
                {householdDetails()?.address?.state &&
                  householdDetails()?.address?.state}{" "}
                {householdDetails()?.address?.zip &&
                  householdDetails()?.address?.zip}
              </div>
            </div>
          </div>
          <button class="btn self-center">Add Household Member</button>
        </Show>
        <ManageHousehold
          openJoinHouseHold={openJoinHouseHold}
          setOpenJoinHouseHold={setOpenJoinHouseHold}
          openCreateHouseHold={openCreateHouseHold}
          setOpenCreateHouseHold={setOpenCreateHouseHold}
        />
      </div>
    </div>
  );
};

export default Household;
