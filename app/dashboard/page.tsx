import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AudioPlayer from "./audio";
import DashboardClient from "./dashboard";

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
      <div className="flex flex-col relative items-center align-center justify-center h-5/6 w-full">
        <DashboardClient />
        <div className="w-5/6 h-1/6 mt-8 flex">
          <div className="bg-melon w-1/2 flex justify-center">
            <AudioPlayer />
          </div>
        <div className="bg-peach w-1/2">
            buttons
        </div>
    </div>
      </div>
    </>
  );
}

