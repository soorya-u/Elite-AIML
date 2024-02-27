import Link from "next/link";
import { Quicksand } from "next/font/google";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";

const quicksand = Quicksand({ weight: "600", subsets: ["latin"] });

function Navigator({ className }: { className: string }) {
  return (
    <>
      <NavigationMenu className={`w-1/2 ${className}`}>
        <NavigationMenuList className="w-full gap-12 flex-shrink-0">
          <NavigationMenuItem>
            <Link href="/" className={`${quicksand.className} text-lg`}>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`${quicksand.className} text-lg p-0 m-0`}
            >
              Result
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid place-items-center w-[150px] grid-cols-1 bg-transparent divide-y-2 divide-white">
                {[
                  { link: "first", title: "First" },
                  { link: "second", title: "Second" },
                  { link: "third", title: "Third" },
                ].map((elem, idx) => (
                  <li
                    key={idx}
                    className={`${quicksand.className} w-full text-center py-1`}
                  >
                    <Link href={`/${elem.link}-sem`}>{elem.title} Sem</Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/department"
              className={`${quicksand.className} text-lg`}
            >
              Department
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" className={`${quicksand.className} text-lg`}>
              About
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

export default Navigator;
