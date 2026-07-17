"use client";

import Link from "next/link";
import { MailCheck, RefreshCcw } from "lucide-react";

export default function VerifyEmailPage() {
    return (
        <div>

            {/* Icon */}

            <div className="flex justify-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">

                    <MailCheck size={48} className="text-blue-600" />

                </div>

            </div>

            {/* Header */}

            <div className="mt-8 text-center">

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Verify Your Email
                </h1>

                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    We have sent a verification link to your email address.
                </p>

                <p className="mt-2 font-semibold text-blue-600">
                    example@email.com
                </p>

            </div>

            {/* Information */}

            <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">

                <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    Next Steps
                </h2>

                <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">

                    <li>📧 Check your inbox for the verification email.</li>

                    <li>🔗 Click the verification link.</li>

                    <li>✅ Once verified, return here and continue.</li>

                </ul>

            </div>

            {/* Buttons */}

            <div className="mt-8 space-y-4">

                <button className="w-full rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    I have Verified My Email
                </button>

                <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-4 font-semibold transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800">

                    <RefreshCcw size={18} />

                    Resend Verification Email

                </button>

            </div>

            {/* Footer */}

            <div className="mt-8 text-center">

                <p className="text-sm text-gray-500">
                    Wrong email?
                </p>

                <Link href="/signup" className="mt-2 inline-block font-semibold text-blue-600 hover:underline">
                    Back to Signup
                </Link>

            </div>

        </div>
    );
}