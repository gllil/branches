import { Route, Routes } from "solid-app-router";
import { lazy } from "solid-js";

const Footer = lazy(() => import("./components/Footer"));
const Navigation = lazy(() => import("./components/Navigation"));
import CreateAccount from "./pages/CreateAccount";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
const Dashboard = lazy(() => import("./pages/Dashboard"));
import NotFound from "./pages/NotFound";
import Protected from "./auth/Protected";
import Profile from "./pages/Profile";
import UpdateAddress from "./components/UpdateAddress";
import Household from "./pages/Household";

function App() {
  return (
    <div class="bg-gradient-to-b from-violet-500 to-violet-200 min-h-screen bg-fixed relative">
      <Navigation />
      <div class="container mx-auto min-h-[75vh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/address" element={<UpdateAddress />} />
            <Route path="/household" element={<Household />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
