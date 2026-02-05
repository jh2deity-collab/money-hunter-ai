"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Phone } from "lucide-react";

export default function SupportPage() {
    const faqs = [
        {
            q: "진단 결과는 얼마나 정확한가요?",
            a: "Money Hunter AI는 2026년 최신 세법 및 보험 약관 데이터를 기반으로 분석합니다. 다만, 개별적인 특수 상황에 따라 실제 결과와 차이가 있을 수 있으므로 전문가 재검토를 권장합니다."
        },
        {
            q: "개인정보는 안전한가요?",
            a: "네, 입력하신 모든 정보는 암호화되어 전송되며, 진단 세션이 종료되는 즉시(브라우저 종료 시) 서버에서 파기됩니다. 별도의 저장을 원하지 않으시면 '비회원 진단'을 이용하세요."
        },
        {
            q: "비용이 발생하나요?",
            a: "기본적인 진단 및 요약 리포트는 무료입니다. 법률적 효력이 있는 상세 소명서 작성이나 전문가 상담 연결 시에만 별도의 비용이 발생할 수 있습니다."
        },
        {
            q: "상세 리포트는 어떻게 받나요?",
            a: "진단 결과 페이지에서 '상세 리포트 다운로드' 버튼을 클릭하면 PDF 형태로 즉시 다운로드 가능합니다."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-[1000px] mx-auto" style={{ maxWidth: '1000px' }}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-banking-navy sm:text-4xl">
                        고객센터
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        궁금한 점을 확인하고 문의해주세요.
                    </p>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-banking-gold transition-colors cursor-pointer">
                        <div className="bg-blue-50 p-3 rounded-full text-banking-navy">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">1:1 문의하기</h3>
                            <p className="text-sm text-gray-500">평일 09:00 - 18:00</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-banking-gold transition-colors cursor-pointer">
                        <div className="bg-yellow-50 p-3 rounded-full text-banking-navy">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">전화 상담</h3>
                            <p className="text-sm text-gray-500">1588-0000 (ARS 1번)</p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-banking-navy">자주 묻는 질문 (FAQ)</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="group">
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-medium text-gray-900">Q. {faq.q}</span>
                                    {openIndex === idx ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                                {openIndex === idx && (
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed bg-gray-50/50">
                                        <div className="pt-2 text-sm border-t border-gray-100 border-dashed">
                                            A. {faq.a}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
