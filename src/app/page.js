import Discover from "@/components/Discover/Discover";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Discover></Discover>
    </div>
  );
}
