import { useNavigate } from "solid-app-router";
import { createEffect, createSignal, onMount } from "solid-js";
import { Show } from "solid-js/web";
import { auth } from "../../firebase/config";
import ManageHousehold from "../components/ManageHousehold";
import useStore from "../hooks/useStore";

const Profile = () => {
  const { user, updateUserData } = useStore();
  const [success, setSuccess] = createSignal(null);
  const [error, setError] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [file, setFile] = createSignal(null);
  const [address, setAddress] = createSignal(null);
  const [addressFormData, setAddressFormData] = createSignal(null);
  const [userAddress, setUserAddress] = createSignal(null);

  console.log(addressFormData());

  const navigate = useNavigate();

  createEffect(() => {
    setUserAddress(user()?.address);
  });

  onMount(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.lob.com/lob/address-elements/2.2.1/address-elements.min.js";
    script.async = true;
    script.setAttribute(
      "data-lob-key",
      "live_pub_dcafc668c96c6b52229377916b2bc54"
    );
    // script.setAttribute("data-lob-primary-value", "true");
    document.body.appendChild(script);
  });

  const types = ["image/png", "image/jpeg"];
  const handleUploadChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      // setError(null);
    } else {
      setFile(null);
      // setError("Please select an image file (png or jpeg)");
    }
    console.log(file());
  };

  return (
    <div>
      <div class="w-full flex justify-start">
        <button
          class=" w-20 flex justify-center items-center font-semibold text-lg"
          onClick={() => navigate("/dashboard", { replace: true })}
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
      <div class="min-h-[80vh] mx-auto min-w-screen justify-center items-center inline-block w-full mt-5">
        <div class="w-full flex justify-center container mx-auto">
          <div class="font-conf sm:max-w-2xl w-full px-7 py-6 rounded my-5 sm:my-5 mx-auto sm:mx-0">
            <div class="text-2xl relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900">
              Your Information
            </div>
            <Show when={user()} fallback={<div>Loading...</div>}>
              <form id="infoForm" name="infoForm">
                <div class="flex flex-wrap justify-between mx-0 mt-5 mb-3">
                  <div class="input-box">
                    <span class="details">Preferred Name</span>
                    <input
                      name="displayName"
                      type="Text"
                      value={auth?.currentUser.displayName}
                      required
                    />
                  </div>
                  <div class="input-box">
                    <span class="details ">Profile Picture</span>
                    <div class="flex columns-2 justify-between">
                      <label class="btn">
                        Upload Picture
                        <input
                          class="hidden"
                          type="file"
                          onChange={handleUploadChange}
                        />
                      </label>
                      {file() && <span class="text-center">{file().name}</span>}
                    </div>
                  </div>
                  <div class="input-box">
                    <span class="details">First Name</span>

                    <input
                      name="firstName"
                      type="text"
                      value={user().firstName}
                      required
                    />
                  </div>
                  <div class="input-box">
                    <span class="details">Last Name</span>
                    <input
                      name="lastName"
                      type="text"
                      value={user().lastName}
                      required
                    />
                  </div>

                  <div class="input-box">
                    <span class="details">Email</span>
                    <input
                      name="email"
                      type="email"
                      value={user().email}
                      required
                    />
                  </div>
                  <div class="input-box">
                    <span class="details">Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      value={user().phone}
                      // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      required
                    />
                  </div>
                  <div class="flex justify-center w-full">
                    {loading() ? (
                      <button class="btn" disabled>
                        Loading...
                      </button>
                    ) : (
                      <button class="btn">Update</button>
                    )}
                  </div>
                </div>
              </form>
              {error() && <div class="font-bold text-red-700">{error()}</div>}
              {success() && (
                <div class="font-bold text-lime-700">{success()}</div>
              )}
            </Show>
            <div class="text-2xl relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900 mt-10">
              Your Address
            </div>
            <Show
              when={userAddress()}
              fallback={
                <div class="w-full flex justify-center h-28 items-center my-12">
                  <button
                    class="btn"
                    onClick={() => navigate("/address", { replace: true })}
                  >
                    Add Your Address Here
                  </button>
                </div>
              }
            >
              <div class="flex justify-center my-12">
                <div class="text-left w-max">
                  <div>{userAddress()?.address1}</div>
                  <div>
                    {userAddress()?.address2 && userAddress()?.address2}
                  </div>
                  <div>
                    {userAddress()?.city && userAddress()?.city + ", "}
                    {}
                    {userAddress()?.state && userAddress()?.state}{" "}
                    {userAddress()?.zip && userAddress()?.zip}
                  </div>
                </div>
              </div>
              <div class="w-full flex justify-center mt-2">
                <button
                  class="btn"
                  onClick={() => navigate("/address", { replace: true })}
                >
                  Edit Address
                </button>
              </div>
            </Show>
          </div>
        </div>
        {/* Manage Household form */}
        <ManageHousehold />
      </div>
    </div>
  );
};

export default Profile;
