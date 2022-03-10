import { Route, Routes } from "solid-app-router";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import CreateAccount from "./pages/CreateAccount";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

function App() {
  return (
    <div class="bg-gradient-to-b from-violet-500 min-h-screen bg-fixed relative">
      <Navigation />
      <div class="container mx-auto min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
