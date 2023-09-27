"use client";
import React from "react";
import WelcomeTextBox from "./WelcomeTextBox";
import {
  type Session,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../types/supabase";

export default function WelcomeInput({ session }: { session: Session | null }) {
  const supabase = createPagesBrowserClient<Database>();

  // updating username and send to db
  const handleWelcome = async (username: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("users")
          .update({
            user_name: username,
          })
          .eq("id", user.id);
      }
    } catch (error) {
      alert("Error updating the data");
    }
  };

  return (
    <div className="bg-white z-10 w-3/4 p-4 font-sans text-2xl shadow-lg rounded-lg shadow-licorice/30">
      <div className="flex flex-col wrap">
        <WelcomeTextBox handleWelcome={handleWelcome} />
      </div>
    </div>
  );
}
