import leaves from "../assets/svg/leaves-3.svg";

const Landing = () => {
  return (
    <div class=" mt-20">
      <div class="columns-2 mt-20 pt-20 h-full">
      
        <div class="ml-2">
          <h3 class="text-4xl font-bold font-conf">Connect and Grow your Branches</h3>
          <h3 class="text-3xl font-arch mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
          <button class="text-center text-white font-bold bg-purple-900 py-2 px-2 font-conf rounded-xl mt-5">Create a free account</button>
        </div>
        <div class="flex-wrap justify-items-center"><img class="opacity-90 max-w-lg mx-auto my-auto" src={leaves}/></div>
        
      </div>
    </div>
  );
};

export default Landing;
