// import { Button } from "@/components/ui/button";
import { ModeToggle } from "./toggle";
import WalletBar from "./WalletBar";
import Image from "next/image";
import logo from "../../public/logo.webp";
import { Righteous } from "next/font/google";

const righteous = Righteous({ weight: ["400"], subsets: ["latin"] });

export default function Header() {
  return (
    <header className="w-full bg-none z-30">
      <div className="mx-auto w-[70rem] m-5 flex items-center justify-between mt-4 py-4 shadow-inner px-8 rounded-full">
        <div className=" flex justify-center items-center">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="mr-2 rounded-full"
          />
          <h1
            className={`text-3xl ${righteous.className} uppercase text-foreground`}
          >
            BeamX
          </h1>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="bg-purple-600 rounded-xl text-white hover:bg-purple-700">
            <WalletBar />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
