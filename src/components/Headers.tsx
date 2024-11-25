// import { Button } from "@/components/ui/button";
import { ModeToggle } from "./toggle";
import WalletBar from "./WalletBar";

export default function Header() {
  return (
    <header className="w-full bg-none z-30">
      <div className="mx-auto w-[70rem] m-5 flex items-center justify-between mt-4 py-4 shadow-inner px-8 rounded-full">
        <h1 className="text-2xl font-bold text-foreground">BeamX</h1>
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
