import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/serverAuth";

/**
 * Unauthenticated Page
 *
 * Shows when user tries to access protected routes without auth
 * If authenticated, redirects to dashboard
 */
export default async function Unauthenticated() {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-script mb-4">Welcome to Tomoiru!</h1>
        <p className="font-sans mb-4">Please sign in to use the app.</p>
        <a
          href="/login"
          className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-sans font-bold rounded-lg text-lg px-5 py-2.5"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
