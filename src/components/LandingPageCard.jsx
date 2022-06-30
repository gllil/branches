const LandingPageCard = ({ content, iconUrl, iconName }) => {
  return (
    <div class="text-center bg-violet-200 rounded mx-auto my-5 md:mx-5 p-3 max-w-md min-h-min shadow-md">
      <div class="flex justify-center p-6">
        <img src={iconUrl} alt={iconName} width="100px" />
      </div>
      <p class="text-2xl text-indigo-900 font-conf font-bold">{content}</p>
    </div>
  );
};

export default LandingPageCard;
