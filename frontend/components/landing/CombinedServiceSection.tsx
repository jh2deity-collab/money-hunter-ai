"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CombinedServiceSection() {
    return (
        <section className="py-20 bg-white">

            <div className="container mx-auto px-6 max-w-[1000px]" style={{ maxWidth: '1000px' }}>

                {/* Feature Section */}
                <div className="w-full max-w-[500px] mx-auto flex flex-col items-center text-center">
                    <h3 className="text-lg font-bold mb-6 uppercase tracking-widest" style={{ color: '#2563eb' }}>Why Use AI?</h3>
                    <div className="mb-12">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-black mb-4 leading-tight">
                            금융사가 알려주지 않는 권리,<br />AI가 대신 주장합니다.
                        </h2>
                        <p className="text-lg text-gray-700 font-medium">
                            법적 근거가 포함된 '대응 논리'를 제공합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full max-w-[500px]">
                        <ServiceCardVertical
                            title="법령 기반 정밀 분석"
                            desc="2026년 최신 세법 및 보험 약관 데이터를 실시간으로 반영하여 분석합니다."
                            imageSrc="/images/legal-analysis.png"
                        />
                        <ServiceCardVertical
                            title="전문가급 리포트"
                            desc="단순 계산이 아닌, 실제 금융기관 제출용 소명 자료를 자동 생성합니다."
                            imageSrc="/images/expert-report.png"
                        />
                        <ServiceCardVertical
                            title="철저한 보안"
                            desc="모든 데이터는 암호화되며, 세션 종료 즉시 파기 옵션을 제공합니다."
                            imageSrc="/images/security.png"
                            className="col-span-2"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

function ServiceCardVertical({ title, desc, imageSrc, className }: { title: string, desc: string, imageSrc: string, className?: string }) {
    return (
        <div className={`bg-white p-4 rounded-xl shadow-md border-2 border-slate-300 flex flex-col items-center justify-start text-center hover:border-blue-400 hover:shadow-xl hover:scale-105 transition-all duration-300 ${className || ''}`}>

            {/* Icon */}
            <div className="w-14 h-14 mb-3 bg-white rounded-lg shadow-md p-2 flex items-center justify-center border border-slate-200">
                <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
            </div>

            {/* Title */}
            <h3 className="text-base font-black text-black mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-900 leading-snug font-medium">
                {desc}
            </p>

        </div>
    )
}
