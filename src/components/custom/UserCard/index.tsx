import Image from "next/image";
import { Poppins } from "next/font/google";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/primitives/button";

import { cn } from "@/utils/cn";

type UserCardProps = {
  imageLink: string | null | undefined;
  name: string | null | undefined;
  className?: string;
};

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export default function UserCard(props: UserCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-x-2",
        props.className,
      )}
    >
      <Image
        className="aspect-square rounded-full border-2 border-[#ccccd2]"
        width={30}
        height={30}
        src={props.imageLink ?? "/default_profile.png"}
        alt="User"
      />
      <h4 className="text-base font-semibold">{props.name}</h4>
      <span className="mx-4 h-6 w-[1px] bg-[#ccccd2] opacity-50"></span>
      <Button
        onClick={() => signOut()}
        className={cn(
          poppins.className,
          "bg-transparent p-0 hover:bg-transparent",
        )}
      >
        <LogOut />
      </Button>
    </div>
  );
}
