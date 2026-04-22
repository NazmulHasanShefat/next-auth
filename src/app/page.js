import Link from "next/link";

export default function Home(){
  return(
    <>
    <h1>This is home page</h1>
    <Link href={"/auth/sign-up"}>Sign up</Link>
    </>
  )
}