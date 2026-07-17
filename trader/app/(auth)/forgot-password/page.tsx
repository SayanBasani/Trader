"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <div>

            {/* Header */}

            <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Mail size={36} className="text-blue-600" />
                </div>

                <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
                    Forgot Password?
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                    Dont worry! Enter your registered email address and we will send you a verification code.
                </p>

            </div>

            {/* Form */}

            <form className="mt-10 space-y-6">

                <div>

                    <label className="mb-2 block font-medium">
                        Email Address
                    </label>

                    <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

                        <Mail size={18} className="text-gray-400" />

                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="w-full bg-transparent px-3 py-4 outline-none"
                        />

                    </div>

                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    Send OTP
                </button>

            </form>

            {/* Info Card */}

            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-900/20">

                <h2 className="font-semibold text-blue-700 dark:text-blue-300">
                    What happens next?
                </h2>

                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">

                    <li>• A 6-digit OTP will be sent to your email.</li>

                    <li>• Verify the OTP.</li>

                    <li>• Create your new password.</li>

                </ul>

            </div>

            {/* Back */}

            <div className="mt-8 text-center">

                <Link href="/login" className="inline-flex items-center gap-2 font-medium text-blue-600 transition hover:underline">

                    <ArrowLeft size={18} />

                    Back to Login

                </Link>

            </div>

        </div>
    );
}