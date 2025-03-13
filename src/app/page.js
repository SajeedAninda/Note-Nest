import Discover from "@/components/Discover/Discover";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="w-full lg:w-[1270px] mx-auto">
      <Navbar />
      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>

        <div className="w-4/5 flex-grow">
          <Discover></Discover>
        </div>
      </div>
    </div>
  );
}
