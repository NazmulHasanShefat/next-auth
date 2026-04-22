"use client";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data, isPending } = useSession();
  console.log(data);
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = data?.user;
  console.log(user, "this is user data from navbar");
  console.log(data, "this is session data from navbar");
  return (
    <div className="flex justify-between items-center p-5">
      <h1>logo</h1>
      <ul className="flex justify-center items-center gap-5">
        {data ? (
          <div className="flex gap-6">
          <div> {user?.name} </div>
          <button onClick={()=> signOut()} className="cursor-pointer">logout</button>
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

export default Navbar;
