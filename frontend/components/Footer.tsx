import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#f8f8f9] border-t border-gray-200 pt-12 pb-8 text-xs text-gray-500">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 border-b border-gray-200 pb-8">
                    <div className="space-y-4">
                        <div className="text-2xl font-bold text-gray-300 select-none">Money Hunter AI</div>
                        <p className="max-w-md text-gray-500">
                            본 서비스는 2026년 금융 관계 법령 및 약관을 기준으로 시뮬레이션 결과를 제공합니다.<br />
                            실제 환급액은 관할 세무서 및 해당 금융사의 심사 결과에 따라 달라질 수 있습니다.
                        </p>
                    </div>
                    <div className="flex gap-12">
                        <div>
                            <h4 className="font-bold text-gray-700 mb-3 text-sm">회사소개</h4>
                            <ul className="space-y-2">
                                <li><Link href="/terms" className="hover:text-gray-900">서비스 이용약관</Link></li>
                                <li><Link href="/privacy" className="hover:text-gray-900 font-bold text-gray-800">개인정보처리방침</Link></li>
                                <li><Link href="/inquiry" className="hover:text-gray-900">제휴문의</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-700 mb-3 text-sm">고객센터</h4>
                            <ul className="space-y-2">
                                <li className="text-xl font-bold text-banking-navy">1588-0000</li>
                                <li>평일 09:00 ~ 18:00</li>
                                <li>(주말 및 공휴일 휴무)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>Copyright © 2026 Money Hunter AI Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        {/* SNS Icons placeholders */}
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
