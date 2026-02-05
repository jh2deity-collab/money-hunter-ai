"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert("로그인 기능은 아직 준비 중입니다. (Mock Action)");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1000px]" style={{ maxWidth: '1000px' }}>
                <div className="flex justify-center">
                    <div className="bg-banking-gold w-12 h-12 rounded-full flex items-center justify-center text-banking-navy font-black text-2xl shadow-sm">
                        M
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-banking-navy">
                    로그인
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    서비스 이용을 위해 로그인해 주세요.
                </p>
            </div>

            <div className="mt-8 mx-auto w-full max-w-[1000px]" style={{ maxWidth: '1000px' }}>
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 w-full">
                    <form className="space-y-6 w-full" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                                아이디
                            </label>
                            <div className="mt-1">
                                <input
                                    id="id"
                                    name="id"
                                    type="text"
                                    required
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-banking-gold focus:border-banking-gold sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                비밀번호
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-banking-gold focus:border-banking-gold sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-banking-gold focus:ring-banking-gold border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    아이디 저장
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-banking-navy hover:text-banking-gold">
                                    아이디/비밀번호 찾기
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-banking-navy hover:bg-[#2c3140] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-banking-navy transition-colors"
                            >
                                로그인
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    아직 회원이 아니신가요?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/signup" className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-banking-gold transition-colors">
                                회원가입
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
