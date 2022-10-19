import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "solid-app-router";
import { createSignal } from "solid-js";
import { Show } from "solid-js/web";
import { auth } from "../../firebase/config";
import Modal from "../components/Modal";

const Login = () => {
  const [success, setSuccess] = createSignal(null);
  const [error, setError] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [modalSuccess, setModalSuccess] = createSignal(null);
  const [modalError, setModalError] = createSignal(null);
  const [modalLoading, setModalLoading] = createSignal(false);
  const [formData, setFormData] = createSignal(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = createSignal(null);
  const [loginProssecing, setLoginProcessing] = createSignal(false);
  const [showForgotPw, setShowForgotPw] = createSignal(false);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData(), [name]: value });
    setError(null);
  };
  const handleForgotPwChange = (e) => {
    const { value } = e.target;
    setForgotPasswordEmail(value);
    setModalError(null);
  };

  const handleForgotPassword = () => {
    setShowForgotPw(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginProssecing(true);
    setLoading(true);
    signInWithEmailAndPassword(auth, formData().email, formData().password)
      .then(() => {
        setSuccess("Login Successful");
        setLoading(false);
        document.loginForm.reset();
        setTimeout(() => {
          setSuccess(null);
          setLoginProcessing(false);
          navigate("/dashboard");
        }, 3000);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err.message);
        setError(err.message.split(": ")[1]);
        setTimeout(() => {
          setError(null);
        }, 10000);
      });
  };
  const handleForgotPwSubmit = (e) => {
    e.preventDefault();

    setModalLoading(true);
    sendPasswordResetEmail(auth, forgotPasswordEmail())
      .then(() => {
        document.forgotPasswordForm.reset();
        setModalSuccess("Password reset has been sent to your email");
        setModalLoading(false);
        setTimeout(() => {
          setModalSuccess(null);
          setShowForgotPw(false);
        }, 5000);
      })
      .catch((err) => {
        setModalLoading(false);
        console.error(err.message);
        setModalError(err.message.split(": ")[1]);
        setTimeout(() => {
          setModalError(null);
        }, 10000);
      });
  };

  return (
    <div class="min-h-[80vh] mx-auto flex min-w-screen justify-center items-center columns-1">
      <div class="font-conf max-w-full sm:max-w-2xl w-full bg-white px-7 py-6 rounded mx-2 sm:mx-0">
        <div class="text-2xl relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900">
          Login
        </div>
        <form
          id="loginForm"
          name="loginForm"
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        >
          <div class="flex max-h-[300px] overflow-y-scroll sm:overflow-visible sm:max-h-full flex-wrap justify-between mx-0 mt-5 mb-3">
            <div class="input-box">
              <span class="details">Email</span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
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
              Sign In
            </button>
          )}
        </form>
        <div class="flex justify-evenly">
          <button class="" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
          <button class="" onClick={() => (location.href = "/create-account")}>
            Dont have an account?
          </button>
        </div>
      </div>
      {/* this is the modal that appears when forgot password button is clicked. it is hidden initially*/}

      <Show when={showForgotPw()}>
        <Modal setShow={setShowForgotPw}>
          <div class="text-2xl relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900">
            Forgot Password
          </div>
          <form
            id="forgotPasswordForm"
            name="forgotPasswordForm"
            onChange={handleForgotPwChange}
            onSubmit={handleForgotPwSubmit}
          >
            <div class="flex max-h-[300px] overflow-y-scroll sm:overflow-visible sm:max-h-full flex-wrap justify-center mx-0 mt-5 mb-3">
              <div class="input-box ">
                <span class="details">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  class="valid:border-indigo-900 focus:border-indigo-900"
                />
              </div>

              {modalError() && (
                <div class=" w-full bg-red-800 text-white p-2 rounded">
                  {modalError()}
                </div>
              )}
              {modalSuccess() && (
                <div class="w-full bg-emerald-600 text-white p-2 rounded">
                  {modalSuccess()}
                </div>
              )}
            </div>
            {modalLoading() ? (
              <button class="btn h-11 w-full my-8 mx-0" disabled>
                Loading...
              </button>
            ) : (
              <button class="btn h-11 w-full my-8 mx-0" type="submit">
                Send Forgot Password Email
              </button>
            )}
          </form>
        </Modal>
      </Show>
    </div>
  );
};

export default Login;
