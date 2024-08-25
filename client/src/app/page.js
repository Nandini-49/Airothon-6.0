import Image from "next/image";
import Herosection from "./landingpage/Herosection";
import Services from "./landingpage/Services";
import Showcase from "./landingpage/Showcase";

export default function Home() {
  
  return (
   <div className=" bg-gray-900">
   <Herosection/>
   <Services/>
   <Showcase/>
   <hr className=" bg-white "></hr>
    </div>
  );
}
