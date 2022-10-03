import Controls from "./components/controls";
import Navbar from "./components/navbar";
import Main from "./pages/main";

export default function App() {
  return (
    <>
      <div className="w-screen h-screen text-white bg-black/90">
        <div className="container mx-auto h-full">
          <Navbar />
          <Main />
        </div>
        <div className="container mx-auto relative">
          <Controls />
        </div>
      </div>
    </>
  );
}
