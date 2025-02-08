"use client";
import { Heart } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { Background } from "@/components/background";

export default function Home() {
  return (
    <>
      <Background />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 z-10">
        <div className="flex w-full max-w-sm flex-col gap-6 z-10">
          <a
            href=""
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Heart className="size-4" />
            </div>
            My Matias 💙
          </a>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
