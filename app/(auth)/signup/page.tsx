"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import auth from "@/public/images/auth.jpg";
import { useActionState, useState } from "react";
import { githubAuth, credentialsSignup } from "@/actions/handleAuth";
import { Button } from "@/components/button";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  const [error, action, isPending] = useActionState(credentialsSignup, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid xl:grid-cols-2 h-[80vh]">
      <div className="flex flex-col items-center justify-center gap-4 w-2/3 lg:w-1/2 place-self-center text-nowrap">
        <div className="flex items-center justify-center gap-4 w-full">
          <button
            className="flex items-center justify-center gap-2 bg-[#EEEEEE] text-[#0f0f0f] text-lg font-semibold w-full px-3 py-1.5 rounded-xl hover:bg-[#EEEEEE]/80 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            <FcGoogle />
            Google
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-[#EEEEEE] text-[#0f0f0f] text-lg font-semibold w-full px-3 py-1.5 rounded-xl hover:bg-[#EEEEEE]/80 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => githubAuth()}
            disabled={isPending}
          >
            <FaGithub />
            Github
          </button>
        </div>

        <div className="flex items-center justify-evenly w-full">
          <hr className="w-1/3 border-gray-500" />
          <h3 className="text-lg font-medium px-1.5">or</h3>
          <hr className="w-1/3 border-gray-500" />
        </div>

        <form
          action={action}
          className="flex flex-col items-center justify-center gap-4 w-full text-gray-200 text-lg font-medium"
        >
          {error && (
            <div
              className="bg-red-800 bg-opacity-50 w-full text-base font-normal text-wrap px-3 py-2 rounded-xl text-center"
              dangerouslySetInnerHTML={{ __html: error }}
            ></div>
          )}

          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              className="w-full py-1.5 px-3 border bg-white/5 border-gray-500 rounded-xl focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              id="slug"
              name="slug"
              placeholder="Username"
              required
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <input
              type="email"
              className="w-full py-1.5 px-3 border bg-white/5 border-gray-500 rounded-xl focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              id="email"
              name="email"
              placeholder="Email"
              required
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-1.5 px-3 border bg-white/5 border-gray-500 rounded-xl focus:outline-hidden mb-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                id="password"
                name="password"
                placeholder="Password"
                required
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                disabled={isPending}
              >
                {showPassword ? <PiEye size={20} /> : <PiEyeClosed size={20} />}
              </button>
            </div>
            <input
              type="password"
              className="w-full p-1.5 px-3 border bg-white/5 border-gray-500 rounded-xl focus:outline-hidden mb-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Confirm Password"
              required
              disabled={isPending}
            />
          </div>

          <Button
            disabled={isPending}
            className="w-full bg-[#EEEEEE] text-[#0f0f0f] text-lg font-semibold py-2 rounded-xl cursor-pointer hover:bg-[#EEEEEE]/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing up..." : "Signup"}
          </Button>
        </form>
        <div className="flex flex-col items-center justify-between gap-4 w-full text-gray-200 text-lg font-medium">
          <div className="text-center mt-2">
            <p>
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-[#EEEEEE] underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                tabIndex={isPending ? -1 : 0}
                aria-disabled={isPending}
              >
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-full rounded-tr-none overflow-hidden hidden xl:block relative">
        <Image
          src={auth}
          alt="The adventure begins"
          fill
          quality={100}
          priority={true}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
