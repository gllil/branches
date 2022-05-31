import { useNavigate } from "solid-app-router";
import { createSignal, onMount, createEffect } from "solid-js";
import useStore from "../hooks/useStore";

const defaultForm = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
};

const UpdateAddress = () => {
  const { user, updateUserData } = useStore();
  const [formData, setFormData] = createSignal(defaultForm);
  const [loading, setLoading] = createSignal(false);
  const [userAddress, setUserAddress] = createSignal(null);
  const [warning, setWarning] = createSignal(false);
  const getFormValue = (key) => formData()[key];

  const navigate = useNavigate();
  let address;

  onMount(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.lob.com/lob/address-elements/2.2.1/address-elements.min.js";
    script.async = true;
    script.setAttribute(
      "data-lob-key",
      "live_pub_dcafc668c96c6b52229377916b2bc54"
    );
    script.setAttribute("data-lob-verify-value", "normal");
    script.setAttribute("data-lob-autosubmit-value", false);
    document.body.appendChild(script);
  });

  createEffect(() => {
    setUserAddress(user()?.address);

    if (getValue("alert") || getValue("alert-warning")) {
      setWarning(true);
    }
    console.log(user());
  });

  const setFormValue = (e) => {
    setFormData({ ...formData(), [e.target.name]: e.target.value });
    address = {
      address1: getValue("address1"),
      address2: getValue("address2"),
      city: getValue("city"),
      state: getValue("state"),
      zip: getValue("zip"),
    };
  };

  const getValue = (id) => {
    return document.getElementById(id).value;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    address = {
      address1: getValue("address1"),
      address2: getValue("address2"),
      city: getValue("city"),
      state: getValue("state"),
      zip: getValue("zip"),
    };

    updateUserData({ address: address })
      .then((res) => {
        console.log(res);
        navigate("/profile", { replace: true });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div class="w-full flex justify-start mb-2">
        <button
          class=" w-20 flex justify-center items-center font-semibold text-lg"
          onClick={() => navigate("/profile", { replace: true })}
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
      <div class="container mx-auto max-w-screen-sm md:max-w-screen-md">
        <div class="text-2xl my-2 relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900">
          Manage Address
        </div>
        <Show when={userAddress()}>
          <div class="flex justify-center my-9">
            <div class="text-left w-fit text-lg">
              <div>{userAddress()?.address1}</div>
              <div>{userAddress()?.address2 && userAddress()?.address2}</div>
              <div>
                {userAddress()?.city && userAddress()?.city + ", "}
                {}
                {userAddress()?.state && userAddress()?.state}{" "}
                {userAddress()?.zip && userAddress()?.zip}
              </div>
            </div>
          </div>
        </Show>
        <form
          id="addressForm"
          name="addressForm"
          onSubmit={handleAddressSubmit}
          onChange={setFormValue}
        >
          {warning() && <div>Test</div>}
          <div id="alert" class="alert" data-lob-verify-message></div>
          <div
            id="alert-warning"
            class="alert-warning"
            data-lob-verify-message
          ></div>
          <div class="flex flex-wrap justify-between mx-0 mt-5 mb-3">
            <div class="input-box-full form-group">
              <label class="details required" htmlFor="address1">
                Street Address
              </label>
              <input
                class="form-control"
                id="address1"
                name="address1"
                type="text"
                placeholder="Enter your street address"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                onChange={setFormValue}
                onBlur={setFormValue}
                value={getFormValue("address1")}
              />
            </div>
            <div class="input-box form-group">
              <label htmlFor="address2" class="details required">
                Apt, Suite, Unit
              </label>
              <input
                id="address2"
                name="address2"
                type="text"
                placeholder="Enter your Apt, Suite, Unit"
                onChange={setFormValue}
                onBlur={setFormValue}
                value={getFormValue("address2")}
              />
            </div>
            <div class="input-box form-group">
              <label htmlFor="city" class="details required">
                City
              </label>
              <input
                class="form-control"
                id="city"
                name="city"
                type="text"
                placeholder="Enter your City"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"

                onChange={setFormValue}
                onBlur={setFormValue}
                value={getFormValue("city")}
              />
            </div>
            <div class="input-box form-group">
              <label htmlFor="state" class="details required">
                State
              </label>
              <select
                id="state"
                name="state"
                type="text"
                data-lob-state
                onChange={setFormValue}
                onBlur={setFormValue}
                value={getFormValue("state")}
              >
                <option>Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div class="input-box form-group">
              <label htmlFor="zip" class="details required">
                Zip Code
              </label>
              <input
                class="form-control"
                id="zip"
                name="zip"
                type="text"
                placeholder="Enter your Zip code"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"

                onInput={setFormValue}
                onBlur={setFormValue}
                value={getFormValue("zip")}
              />
            </div>
          </div>
          <div class="flex justify-center w-full">
            {loading() ? (
              <button class="btn" disabled>
                Loading...
              </button>
            ) : (
              <input class="btn w-auto border-0" type="submit" value="Submit" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
