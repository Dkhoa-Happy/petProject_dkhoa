import Link from "next/link";
import Image from "next/image";
import { BadgePlus, Home, UserRound } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { avatarPlaceholderUrl } from "@/constants";

const Navbar = async () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/icons/logo2.svg" alt="logo" width={150} height={50} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          <>
            <Link href="/" className="flex items-center gap-2">
              <span className="max-sm:hidden">Home</span>
              <Home className="size-6 sm:hidden" />
            </Link>

            <Link href="/user" className="flex items-center gap-2">
              <span className="max-sm:hidden">Users</span>
              <UserRound className="size-6 sm:hidden" />
            </Link>

            <Link href="/posts/create" className="flex items-center gap-2">
              <span className="max-sm:hidden">Create</span>
              <BadgePlus className="size-6 sm:hidden" />
            </Link>

            <Avatar className="size-10">
              <AvatarImage src={avatarPlaceholderUrl} alt="avatar" />
            </Avatar>
          </>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
