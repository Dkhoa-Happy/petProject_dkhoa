import Link from "next/link";
import Image from "next/image";
import { BadgePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/icons/logo2.svg" alt="logo" width={150} height={50} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          <>
            <Link href="/startup/create">
              <span className="max-sm:hidden">Create</span>
              <BadgePlus className="size-6 sm:hidden" />
            </Link>

            <Avatar className="size-10">
              <AvatarImage
                src="https://i.pinimg.com/736x/ae/ba/70/aeba702dc253fc6b892693a028473b9b.jpg"
                alt="avatar"
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
