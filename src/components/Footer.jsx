const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="text-center container mt-auto mx-auto py-5 min-w-full">
      <h1 class="text-2xl font-semibold ">Branches</h1>
      <h5 class="text-xl">
        <span>©</span> Copyright {currentYear}
      </h5>
    </footer>
  );
};

export default Footer;
