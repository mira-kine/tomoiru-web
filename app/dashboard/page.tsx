import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard";
import Image from "next/legacy/image";

export default async function Dashboard() {
  // This is a server component because there is no user activity - can be server side rendered and hydrate client component
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();


  if (!session) {
    redirect("/unauthenticated");
  }

  return (
    <>
      <div className="flex flex-col relative items-center align-center justify-center h-full w-full">
      <div className="absolute inset-0">
        <Image
          src="/assets/food-bg.png"
          alt="drawn background of living room"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute -z-1"
          priority={true}
        />
      </div>
        <DashboardClient />
      </div>
    </>
  );
}

