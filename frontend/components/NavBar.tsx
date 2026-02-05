import Link from "next/link";
import { Search, Menu, User } from "lucide-react"; // 아이콘 대체 (Lucide가 없다면 SVG로 직접 구현)

export default function NavBar() {
    return (
        <div className="w-full flex flex-col z-50">
            {/* Top Utility Bar */}
            <div className="bg-gray-100 border-b border-gray-200 py-1 px-4 text-xs text-gray-500">
                <div className="container mx-auto flex justify-end space-x-4">
                    <Link href="/login" className="hover:text-banking-gold transition-colors">로그인</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/signup" className="hover:text-banking-gold transition-colors">회원가입</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/support" className="hover:text-banking-gold transition-colors">고객센터</Link>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto flex items-center justify-between px-4 py-2">
                    {/* Logo Section */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-[17px] group">
                            <img
                                src="/images/logo-symbol.png?v=2"
                                alt="Money Hunter AI Logo"
                                style={{ width: '50px', height: '50px' }}
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="text-[25px] font-black text-[#020617] tracking-tighter group-hover:text-banking-gold transition-colors duration-300">
                                Money Hunter AI
                            </span>
                        </Link>

                        {/* Main Navigation (Desktop) */}
                        <nav className="hidden md:flex items-center space-x-8 text-[15px] font-bold text-banking-navy">
                            <Link href="#" className="hover:text-banking-gold hover:underline decoration-2 decoration-banking-gold underline-offset-8 transition-all">
                                개인진단
                            </Link>
                            <Link href="#" className="hover:text-banking-gold hover:underline decoration-2 decoration-banking-gold underline-offset-8 transition-all">
                                기업/법인
                            </Link>
                            <Link href="#" className="hover:text-banking-gold hover:underline decoration-2 decoration-banking-gold underline-offset-8 transition-all">
                                자산관리API
                            </Link>
                            <Link href="#" className="hover:text-banking-gold hover:underline decoration-2 decoration-banking-gold underline-offset-8 transition-all">
                                금융가이드
                            </Link>
                        </nav>
                    </div>

                    {/* Right Action */}
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                        <button className="md:hidden p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <Link href="/onboarding" className="hidden md:inline-flex h-10 items-center justify-center rounded-lg bg-banking-navy px-5 text-sm font-bold text-white transition-all hover:bg-banking-dark shadow-md">
                            전체메뉴
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}
