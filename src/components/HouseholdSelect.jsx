const HouseholdSelect = ({ setOpenJoinHouseHold, setOpenCreateHouseHold }) => {
  return (
    <div class="w-full flex-row justify-evenly align-middle text-center h-full">
      <div class="mx-auto my-6 w-48 text-center">
        <button class="btn w-full" onClick={() => setOpenJoinHouseHold(true)}>
          Join Household
        </button>
      </div>
      <div class="mx-auto my-6 w-48 text-center">
        <button class="btn w-full" onClick={() => setOpenCreateHouseHold(true)}>
          Create Household
        </button>
      </div>
    </div>
  );
};

export default HouseholdSelect;
