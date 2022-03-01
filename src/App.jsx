import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";

function App() {
  return (
    <div class="bg-gradient-to-b from-violet-500 min-h-screen bg-fixed">
      <Navigation />
      <div class="container mx-auto">
      <Landing />
      </div>
      
    </div>
  );
}

export default App;
