import { createEffect, createSignal, Show } from "solid-js";
import useStore from "../hooks/useStore.js";
import HouseholdList from "./HouseholdList.jsx";
import Modal from "./Modal.jsx";
import UpdateAddress from "./UpdateAddress.jsx";

const ManageHousehold = ({
  openJoinHouseHold,
  setOpenJoinHouseHold,
  openCreateHouseHold,
  setOpenCreateHouseHold,
}) => {
  const { addHouseHold, users, user, headsOfHouseHold, joinHouseHold } =
    useStore();
  const [success, setSuccess] = createSignal(null);
  const [loading, setLoading] = createSignal(null);
  const [error, setError] = createSignal(null);
  const [formData, setFormData] = createSignal(null);
  const [isAccountHolder, setIsAccountHolder] = createSignal(false);
  const [accountHolder, setAccountHolder] = createSignal(null);
  const [confirmHousehold, setConfirmHousehold] = createSignal(false);

  const [openNonMemberModal, setOpenNonMemberModal] = createSignal(false);
  const [openMemberModal, setOpenMemberModal] = createSignal(false);

  createEffect(() => {
    setIsAccountHolder(
      headsOfHouseHold()?.filter((user) => user.email === formData()?.email)
        .length
    );
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "email") {
      setFormData({ ...formData(), [name]: value.toLowerCase() });
    }
    setFormData({ ...formData(), [name]: value });

    setError(null);
  };
  const householdForm = document.getElementById("manageHouseHoldForm");
  const addHouseholdForm = document.getElementById("addHouseholdForm");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    joinHouseHold(
      accountHolder()[0]?.household,
      user(),
      formData()?.relationship
    )
      .then(() => {
        addHouseholdForm?.reset();
        setSuccess("HouseHold has been added successfully");
        setOpenMemberModal(false);
        setOpenJoinHouseHold(false);
        setTimeout(() => {
          setSuccess(null);
          setFormData(null);
        }, 1000);
        householdForm?.reset();
      })
      .catch((err) => {
        setError("Error: " + err.message);
        console.log(err);
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  };

  //code to open modals and handle modal forms
  const handleOpenManageHouseHold = (e) => {
    e.preventDefault();

    if (formData()?.email) {
      if (isAccountHolder()) {
        setAccountHolder(
          users()?.filter((user) => user.email === formData()?.email)
        );
        setOpenMemberModal(true);

        setFormData(accountHolder()[0]);
        window.scroll(0, 0);
      } else {
        window.scroll(0, 0);
      }
    } else {
      setError("Please Add Head of Household Email Address");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };
  return (
    <div class="w-full container flex justify-center mx-auto">
      <div class="font-conf max-w-full sm:max-w-2xl w-full px-7 py-6 rounded my-5 sm:my-0 mx-2 sm:mx-0 block">
        <HouseholdList />
        <Show when={openJoinHouseHold()}>
          <Modal setShow={setOpenJoinHouseHold}>
            <div class="text-center font-bold text-xl mt-7">Join Household</div>
            <form
              id="manageHouseHoldForm"
              name="manageHouseHoldForm"
              onInput={handleFormChange}
            >
              <div class="flex flex-wrap justify-center mx-0 mt-2 mb-3">
                <div class="input-box">
                  <span class="details">Enter Household Email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <Show when={formData()?.email}>
                  <Show
                    when={isAccountHolder()}
                    fallback={
                      <div class="flex justify-center w-full">
                        <div class="font-bold text-red-700">
                          Email not found
                        </div>
                      </div>
                    }
                  >
                    <div class="flex justify-center w-full">
                      <button onClick={handleOpenManageHouseHold} class="btn">
                        Join Household
                      </button>
                    </div>
                  </Show>
                </Show>

                {error() && <div class="font-bold text-red-700">{error()}</div>}
                {success() && (
                  <div class="font-bold text-lime-700">{success()}</div>
                )}
              </div>
            </form>
          </Modal>
        </Show>
      </div>
      <Show when={openCreateHouseHold()}>
        <Modal setShow={setOpenCreateHouseHold}>
          <div class="w-3/4 container mx-auto">
            <div class=" mb-5 text-2xl relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900">
              Add New Household Address
            </div>
            <UpdateAddress />
          </div>
        </Modal>
      </Show>
      <Show when={openMemberModal()}>
        <Modal setShow={setOpenMemberModal}>
          <div class="w-3/4 container mx-auto">
            <div class="mb-5 text-2xl relative font-semibold">
              Verify Household
            </div>
            <form
              id="addHouseholdForm"
              onInput={handleFormChange}
              onSubmit={handleFormSubmit}
            >
              <div class="modal-input-box">
                <span class="details">First Name</span>
                <div>{accountHolder()[0].firstName}</div>
              </div>
              <div class="modal-input-box">
                <span class="details">Last Name</span>
                <div>{accountHolder()[0].lastName}</div>
              </div>
              <div class="modal-input-box">
                <span class="details">Phone</span>
                <div>{accountHolder()[0].phone}</div>
              </div>
              <div class="modal-input-box">
                <span class="details">Relationship</span>
                <select
                  name="relationship"
                  type="password"
                  placeholder="Confirm new password"
                  required
                >
                  <option value="">Choose Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Children">Children</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Parent">Parent</option>
                  <option value="Grand Parent">Grand Parent</option>
                  <option value="Grand Children">Grand Children</option>
                  <option value="Aunt/Uncle">Aunt/Uncle</option>
                  <option value="Niece/Nephew">Niece/Nephew</option>
                  <option value="Cousin">Cousin</option>
                </select>
              </div>

              {confirmHousehold() ? (
                <div class="flex justify-center w-full my-5">
                  <button class="btn">Add Household Member</button>
                </div>
              ) : (
                <div class="flex justify-around">
                  <label for="isPerson" class="font-bold w-max">
                    Check box if this the right person?{" "}
                  </label>
                  <input
                    onInput={(e) => setConfirmHousehold(e.target.value)}
                    type="checkbox"
                    id="isPerson"
                    class="w-max"
                    value={true}
                  />
                </div>
              )}
            </form>
          </div>
        </Modal>
      </Show>
    </div>
  );
};

export default ManageHousehold;
