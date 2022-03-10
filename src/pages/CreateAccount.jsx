const CreateAccount = () => {
  return (
    <div class="min-h-[80vh] mx-auto flex min-w-screen justify-center items-center columns-1">
      <div class="font-conf max-w-full sm:max-w-2xl w-full bg-white px-7 py-6 rounded mx-2 sm:mx-0">
        <div class="text-2xl relative font-semibold before:absolute before:h-1 before:left-0 before:bottom-0 before:content-[''] before:w-7 before:bg-indigo-900">
          Create Account
        </div>
        <form class="">
          <div class="flex max-h-[300px] overflow-y-scroll sm:overflow-visible sm:max-h-full flex-wrap justify-between mx-0 mt-5 mb-3">
            <div class="input-box">
              <span class="details">First Name</span>
              <input type="text" placeholder="Enter your First Name" required />
            </div>
            <div class="input-box">
              <span class="details">Last Name</span>
              <input type="text" placeholder="Enter your Last Name" required />
            </div>
            <div class="input-box">
              <span class="details">Email</span>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div class="input-box">
              <span class="details">Phone</span>
              <input type="text" placeholder="Enter your phone" required />
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                placeholder="Enter new password"
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>
          <button className="btn h-11 w-full my-8 mx-0" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
