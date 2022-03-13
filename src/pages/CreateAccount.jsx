import { createSignal } from "solid-js";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccount = () => {
  const [success, setSuccess] = createSignal(null);
  const [error, setError] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [formData, setFormData] = createSignal(null);
  const [password, setPassWord] = createSignal(null);
  const [confPassWord, setConfPassword] = createSignal(null);
  const createAccountForm = document.getElementById("createAccountForm");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData(), [name]: value });
    setError(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (confPassWord() === password()) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, formData().email, password())
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(doc(db, "users", user.uid), formData()).then(() => {
            setLoading(false);
            setSuccess("Account has been created");
            setTimeout(() => {
              setSuccess(null);
              createAccountForm.reset();
            }, 3000);
          });
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message.split(": ")[1]);
          setTimeout(() => {
            setError(null);
          }, 10000);
        });
    } else {
      setError("Passwords do not match");
    }
  };

  const checkPasswordMatch = (e) => {
    setConfPassword(e.target.value);
    if (confPassWord() !== password()) {
      setError("Password does not match");
    }
  };

  return (
    <div class="min-h-[80vh] mx-auto flex min-w-screen justify-center items-center columns-1">
      <div class="font-conf max-w-full sm:max-w-2xl w-full bg-white px-7 py-6 rounded my-5 sm:my-0 mx-2 sm:mx-0">
        <div class="text-2xl relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900">
          Create Account
        </div>
        <form id="createAccountForm" onSubmit={handleFormSubmit}>
          <div class="flex max-h-[300px] overflow-y-scroll sm:overflow-visible sm:max-h-full flex-wrap justify-between mx-0 mt-5 mb-3">
            <div class="input-box">
              <span class="details">First Name</span>
              <input
                name="firstName"
                type="text"
                placeholder="Enter your First Name"
                onChange={handleFormChange}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Last Name</span>
              <input
                name="lastName"
                type="text"
                placeholder="Enter your Last Name"
                onChange={handleFormChange}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Email</span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleFormChange}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Phone</span>
              <input
                name="phone"
                type="tel"
                placeholder="Enter your phone"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                onChange={handleFormChange}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input
                name="password"
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setPassWord(e.target.value)}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm new password"
                onChange={checkPasswordMatch}
                required
              />
            </div>
            {error() && <div class="font-bold text-red-700">{error()}</div>}
            {success() && (
              <div class="font-bold text-lime-700">{success()}</div>
            )}
          </div>
          {loading() ? (
            <button class="btn h-11 w-full my-8 mx-0" disabled>
              Loading...
            </button>
          ) : (
            <button class="btn h-11 w-full my-8 mx-0" type="submit">
              Sign Up
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
