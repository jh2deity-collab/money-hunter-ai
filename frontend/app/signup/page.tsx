"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "phone") {
            // 숫자만 추출
            const numbersOnly = value.replace(/\D/g, "");
            let formattedPhone = "";

            if (numbersOnly.length <= 3) {
                formattedPhone = numbersOnly;
            } else if (numbersOnly.length <= 7) {
                formattedPhone = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
            } else {
                formattedPhone = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
            }
            setFormData({ ...formData, [name]: formattedPhone });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        alert("회원가입 기능은 아직 준비 중입니다. (Mock Action)");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1000px]" style={{ maxWidth: '1000px' }}>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-banking-navy">
                    회원가입
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Money Hunter AI의 모든 서비스를 이용해보세요.
                </p>
            </div>

            <div className="mt-8 mx-auto w-full max-w-[1000px]" style={{ maxWidth: '1000px' }}>
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 w-full">
                    <form className="space-y-6 w-full" onSubmit={handleSubmit}>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">이름</label>
                            <div className="mt-1">
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-banking-gold focus:border-banking-gold sm:text-sm" />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
                            <div className="mt-1">
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-banking-gold focus:border-banking-gold sm:text-sm" placeholder="010-1234-5678" />
                            </div>
                        </div>

                        {/* ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">아이디</label>
                            <div className="mt-1">
                                <input type="text" name="id" required value={formData.id} onChange={handleChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-banking-gold focus:border-banking-gold sm:text-sm" />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                            <div className="mt-1">
                                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-banking-gold focus:border-banking-gold sm:text-sm" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
                            <div className="mt-1">
                                <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-banking-gold focus:border-banking-gold sm:text-sm" />
                            </div>
                        </div>

                        <div className="text-sm text-gray-500">
                            회원가입 시 <a href="#" className="text-banking-navy underline">이용약관</a> 및 <a href="#" className="text-banking-navy underline">개인정보처리방침</a>에 동의하게 됩니다.
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-banking-navy hover:bg-[#2c3140] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-banking-navy transition-colors"
                            >
                                가입하기
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            이미 계정이 있으신가요?{" "}
                            <Link href="/login" className="font-medium text-banking-navy hover:text-banking-gold">
                                로그인하기
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
