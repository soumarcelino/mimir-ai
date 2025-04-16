"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import pkg from "../../../package.json";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    try {
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <span>Version: {pkg.version}</span>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          By Matias
        </a>
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
}
