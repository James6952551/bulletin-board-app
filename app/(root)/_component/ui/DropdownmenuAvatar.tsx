"use client"

import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./Avatar"
import { Button } from "./Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./Dropdown-menu"
import Link from "next/link"
import { signOut } from "@/lib/actions"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function DropdownMenuAvatar({
  username
}: {
  username: string | null | undefined
}) {
    const router = useRouter();

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/user/sign-in');
                    router.refresh();
                }
            }
        })
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {username?.[0]}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="bg-white mt-2">
        <DropdownMenuGroup>
          <Link href={'/user'}>
              <DropdownMenuItem className="hover:bg-gray-200">
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
          </Link>         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="hover:bg-gray-200">
              <LogOutIcon />
              Sign Out
            </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}