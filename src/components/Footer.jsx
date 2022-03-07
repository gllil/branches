const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="text-center mt-32">
      <h1 class="text-2xl font-semibold mt-5">Branches</h1>
      <h5 class="text-xl mb-5">
        <span>©</span> Copyright {currentYear}
      </h5>
    </footer>
  );
};

export default Footer;
