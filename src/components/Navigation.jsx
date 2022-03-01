
import branchesLogo from "../assets/logos/branchesLogo.svg"
const Navigation = () => {

  return (
    
      <div class="container mx-auto columns-2 top-0">
      <div class="flex justify-start sm:mt-2 items-center">
        {/* <h3 class="text-4xl font-bold font-arch ml-2">Branches</h3> */}
        <img src={branchesLogo} alt="branches logo" class="w-48 md:w-64"/>
      </div>
      <div class="flex justify-end items-center ">
        <button type="button" class="btn mt-2 mr-2 text-sm sm:text-base">
          Login
        </button>
      </div>
    </div>
    
    
  )
};

export default Navigation;
