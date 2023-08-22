import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import dashboardImg from '../../public/assets/dashboard.png'

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
            src={dashboardImg}
            alt="drawn background of a japanese style living room"
            layout="fill"
            objectFit="contain"
            className="w-3/4 h-full inset-0 object-cover -z-1"
            priority={true}
          />
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-3/4 tablet:h-full w-5/6 tablet:w-11/12 z-25 bg-peach">
          <h1 className="text-white">Your Home</h1>
        </div>
      </div>
    </>
  );
}

// next attach events to elements on spline model
