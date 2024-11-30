import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UnruggableUsage from "./UnruggableUsage";

// Define an interface for the props
interface PopupProps {
  name: string;
  symbol: string;
  initialSupply: string;
}

const Popup: React.FC<PopupProps> = ({ name, symbol, initialSupply }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>Proceed</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Proceed with Creating a Memecoin</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <UnruggableUsage
              name={name}
              symbol={symbol}
              initialSupply={initialSupply}
              startingMarketCap="100000"
              holdLimit="1000"
              liquidityLockPeriod={30 * 24 * 60 * 60}
              antiBotPeriodInSecs={300}
              fees="0.1"
              teamAllocations={[
                {
                  address: "",
                  amount: 0,
                },
              ]}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
