import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth-client";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const ServerNav = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  
  console.log(session, + "seassion");

  return (
    <div className="flex justify-between items-center p-5">
      <h1>logo</h1>
      <ul className="flex justify-center items-center gap-5">
        {session ? (
          <div className="flex gap-6">
          <div> {user?.name} </div>
          
          </div>
        ) : (
          <>
            <Link href={"/auth/sign-in"}>sign in</Link>
            <Link href={"/auth/sign-in"}>sign up</Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default ServerNav;
