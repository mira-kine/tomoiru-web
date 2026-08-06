import { Suspense } from "react";
import DashboardClient from "./dashboard";
import Image from "next/legacy/image";
import matchaBg from '../../../public/assets/matcha-bg.png';

/**
 * Dashboard - Server Component
 *
 * Auth is validated by the (protected) route group layout, which redirects to
 * /login if the session is invalid. This page only renders the UI.
 */
export default function Dashboard() {
  return (
    <div className="flex flex-col relative items-center align-center justify-center h-dvh w-full">
      <div className="absolute inset-0">
        <Image
          src={matchaBg}
          alt="drawn background of matcha color with pink hearts"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute -z-1"
          priority={true}
        />
      </div>
      <Suspense fallback={null}>
        <DashboardClient />
      </Suspense>
    </div>
  );
}
