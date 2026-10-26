import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu"
import { DropdownMenuAvatar } from "./ui/DropdownmenuAvatar";
import { getUser, getUserId } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Header(){
    const userId = await getUserId();
    if (!userId) { redirect('/user/sign-in'); }
    const username = await getUser(userId);
    return <div className="px-4 py-8 flex justify-between items-center mb-8 border-b-1 border-gray-300">
        <Link href={"/"}>
            <p className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-800">
                Bulletin Board
            </p>
        </Link>
        <DropdownMenuAvatar username={username?.name}/>         
    </div>
}