const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="text-center container mt-auto mx-auto py-5 min-w-full">
      <h1 class="text-xl font-semibold font-conf ">Branches</h1>
      <h5 class="text-lg font-conf">
        <span>©</span> Copyright {currentYear}
      </h5>
    </footer>
  );
};

export default Footer;
