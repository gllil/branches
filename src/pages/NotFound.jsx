import sailor from "../assets/images/31.png";
const NotFound = () => {
  return (
    <div class=" flex-row justify-center items-center text-center">
      <div class="max-w-3xl flex justify-center mx-auto">
        <img width="100%" src={sailor} alt="sailor looking" />
      </div>
      <div class="font-conf text-5xl font-bold m-2">404 Not Found</div>
      <div class="font-conf text-xl  m-2">
        Cannot find page you are searching for.
      </div>
    </div>
  );
};

export default NotFound;
