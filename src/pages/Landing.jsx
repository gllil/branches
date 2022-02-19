import leaves from "../assets/svg/leaves-3.svg";

const Landing = () => {
  return (
    <div class=" md:mt-20">
      <div class="mt-10  columns-auto md:columns-2 md:mt-20 md:pt-20 ">
      <div class="mb-10 block md:hidden flex-wrap justify-items-center"><img class="max-w-xs opacity-90 mx-auto my-auto " src={leaves}/></div>
        <div class="ml-2 order-last">
          <h3 class="text-4xl font-bold font-conf">Connect and Grow your Branches</h3>
          <h3 class="text-2xl font-arch mt-5">We are all branches of the same tree. Connect with family and loved ones. Create and manage those important family events all in one place.</h3>
          <button class="place-self-end text-center text-white bg-indigo-900 py-2 px-2 font-conf rounded-xl mt-5">Create a free account</button>
        </div>
        <div class="mt-20 hidden md:block flex-wrap justify-items-center sm:mt-0"><img class="opacity-90 max-w-sm lg:max-w-lg mx-auto my-auto " src={leaves}/></div>
        
      </div>
    </div>
  );
};

export default Landing;
