"use client"

import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { useEffect } from "react";
import { syncUser } from "@/actions/user.action";

function DesktopNavbar() {
  const { user, isSignedIn } = useUser();

  // Add this effect to sync user when they sign in
  useEffect(() => {
    if (isSignedIn) {
      // Sync the user with the database
      syncUser();
    }
  }, [isSignedIn]);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex font-semibold items-center gap-2 hover:text-blue-500 hover:bg-blue-500/10" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {isSignedIn ? (
        <>
          <Button variant="ghost" className="flex font-semibold items-center gap-2 hover:text-blue-500 hover:bg-blue-500/10" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex font-semibold items-center gap-2 hover:text-blue-500 hover:bg-blue-500/10" asChild>
            <Link
              href={`/profile/${user?.username ?? user?.emailAddresses[0].emailAddress.split("@")[0]}`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;
