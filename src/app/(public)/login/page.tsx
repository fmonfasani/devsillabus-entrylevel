"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
type LoginData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginData>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: LoginData) => {
    setError("");
    const res = await signIn("credentials", { redirect: false, ...data, callbackUrl: "/dashboard" });
    if (res?.error) setError("Invalid email or password");
    else window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4 rounded bg-white p-6 shadow">
        <h1 className="text-xl font-semibold text-center">Login</h1>
        <div>
          <input {...register("email")} type="email" placeholder="Email" className="w-full rounded border px-3 py-2" />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register("password")} type="password" placeholder="Password" className="w-full rounded border px-3 py-2" />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
