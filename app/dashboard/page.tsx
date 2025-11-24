import { getCurrentUser } from "@/lib/serverAuth";
import DashboardClient from "./dashboard";
import ProtectedLayout from "../components/ProtectedLayout";
import Image from "next/legacy/image";
import matchaBg from '../../public/assets/matcha-bg.png';

/**
 * Dashboard - Server Component
 *
 * Server-side auth validation ensures user is authenticated before rendering
 * Client component (DashboardClient) is hydrated on the client side for interactivity
 *
 * Note: getCurrentUser() auto-redirects to /login if not authenticated
 */
export default async function Dashboard() {
  // Server-side auth check - redirects to /login if not authenticated
  const user = await getCurrentUser();

  return (
    <ProtectedLayout>
      <div className="flex flex-col relative items-center align-center justify-center h-full w-full">
        <div className="absolute inset-0">
          <Image
            src={matchaBg}
            alt="drawn background of matcha color with pink hearts"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
        </div>
        <DashboardClient />
      </div>
    </ProtectedLayout>
  );
}

