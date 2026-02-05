"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { simulateISACycle, simulateOverseasTax, downloadReport } from "@/lib/api";
import { Download, ChevronRight, TrendingUp, PiggyBank, ShieldAlert } from "lucide-react";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<any>({ isa: null, overseas: null });
    const [totalBenefit, setTotalBenefit] = useState(0);

    const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        async function fetchData() {
            const dataStr = searchParams.get("data");

            if (!dataStr) {
                setLoading(false);
                return;
            }

            let answers = {};
            try {
                answers = JSON.parse(dataStr);
            } catch (e) {
                console.error("Failed to parse data", e);
                setLoading(false);
                return;
            }

            let isaResult = null;
            let overseasResult = null;
            let total = 0;

            try {
                if ((answers as any).isa === "yes") {
                    isaResult = await simulateISACycle({
                        current_amount: 50000000,
                        years_maintained: 3,
                        conversion_amount: 30000000
                    });
                    if (isaResult?.total_estimated_benefit) {
                        total += isaResult.total_estimated_benefit;
                    }
                }

                if ((answers as any).overseas && Number((answers as any).overseas) > 0) {
                    overseasResult = await simulateOverseasTax({
                        investment_amount: Number((answers as any).overseas),
                        profit_rate: 0.2
                    });
                    if (overseasResult?.saved_amount) {
                        total += overseasResult.saved_amount;
                    }
                }

                setResults({ isa: isaResult, overseas: overseasResult, answers });
                setTotalBenefit(total);
            } catch (e) {
                console.error("Simulation failed", e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1e2330] flex flex-col items-center justify-center p-4">
                <div className="text-[#ffd700] text-2xl font-serif font-bold animate-pulse">
                    CALCULATING...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* 1. Simple Hero Section with High Contrast and Large Typography */}
            <header className="bg-[#1e2330] text-white py-20 px-4 text-center relative border-b border-[#2d3748]">
                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#d4af37]"></div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <p className="text-[#ffd700] font-bold tracking-widest text-sm mb-4 uppercase drop-shadow-md">
                        Financial Context Analysis Completed
                    </p>
                    <h1
                        className="font-black mb-12 font-serif leading-tight"
                        style={{ fontSize: '30px' }}
                    >
                        귀하의 2026년<br />
                        <span className="text-[#d4af37]">잠재 절세 효과</span> 진단 결과
                    </h1>

                    {/* 
                        FIXED LAYOUT: 
                        - WIDER CONTAINER: Added min-w-[600px] and px-20 to ensure ample space
                        - Color: #d4af37 (Gold) preserved
                        - Format: "Label : Value"
                    */}
                    <div className="
                        bg-[#2d3748] rounded-2xl py-10 px-20 border border-gray-600 shadow-2xl mx-auto w-fit min-w-[600px] transition-transform hover:scale-105 duration-300
                        flex flex-row items-center justify-center gap-10 flex-nowrap
                    ">
                        {/* Label with Colon */}
                        <p
                            className="font-bold mb-0 whitespace-nowrap text-[#d4af37]"
                            style={{ fontSize: '30px' }}
                        >
                            총 예상 절세액 :
                        </p>

                        {/* Amount Value */}
                        <div className="font-black tracking-tight leading-none flex items-center justify-center gap-2 whitespace-nowrap text-[#d4af37]">
                            <span style={{ fontSize: '30px' }}>₩</span>
                            <span style={{ fontSize: '30px' }}>{(totalBenefit / 10000).toLocaleString()}</span>
                            <span className="font-bold" style={{ fontSize: '30px' }}>만원</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Summary Dashboard */}
            <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-20 pb-20">
                <div className="bg-white rounded-xl shadow-xl p-8 mb-12 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <TrendingUp className="text-banking-navy" /> 핵심 진단 요약
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ISA Card */}
                        {results.isa && (
                            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-banking-navy hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-gray-700">ISA 계좌 최적화</h3>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Recommended</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    만기 자금 연금 전환 시 세액공제 한도가 확대됩니다.
                                </p>
                                <p className="text-2xl font-bold text-banking-navy">
                                    + {results.isa.total_estimated_benefit?.toLocaleString()} 원
                                </p>
                            </div>
                        )}

                        {/* Overseas Card */}
                        {results.overseas && (
                            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-banking-gold hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-gray-700">해외주식 절세</h3>
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">High Impact</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    ISA 전용 계좌 활용 시 실효세율을 낮출 수 있습니다.
                                </p>
                                <p className="text-2xl font-bold text-banking-navy">
                                    + {results.overseas.saved_amount?.toLocaleString()} 원
                                </p>
                            </div>
                        )}

                        {/* Insurance Alert (If exists) */}
                        {results.answers?.insurance === "yes" && (
                            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500 md:col-span-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldAlert className="text-red-600 w-5 h-5" />
                                    <h3 className="font-bold text-red-800">미청구 보험금 확인 필요</h3>
                                </div>
                                <p className="text-sm text-red-700">
                                    과거 면책 건에 대한 청구권이 존재합니다. 상세 내용은 리포트를 확인하세요.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. CTA: Download PDF with Massive Button */}
                <div className="text-center space-y-6">
                    <p className="text-gray-600 text-lg font-medium">
                        상세한 분석 내용과 구체적인 액션 플랜, 법적 근거는<br />
                        <span className="font-bold text-gray-800">정식 PDF 보고서</span>에 모두 담겨 있습니다.
                    </p>

                    <button
                        onClick={async () => {
                            try {
                                const blob = await downloadReport(results);
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "MoneyHunter_Report.pdf";
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                            } catch (e) {
                                alert("리포트 생성 중 오류가 발생했습니다.");
                            }
                        }}
                        style={{ fontSize: '20px', fontWeight: 900 }}
                        className="w-full md:w-auto bg-banking-navy hover:bg-[#2c3140] text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-4 mx-auto
                                   py-8 px-12 leading-tight"
                    >
                        <Download className="w-10 h-10 text-[#d4af37]" />
                        <span className="drop-shadow-sm">전체 상세 보고서 다운로드 (PDF)</span>
                    </button>

                    <p className="text-sm text-gray-400 mt-8">
                        Report ID: MH-2026-SECURE • Confidential • Money Hunter AI
                    </p>
                </div>
            </main>
        </div>
    );
}
