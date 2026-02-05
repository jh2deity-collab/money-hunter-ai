"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Database, Lock, CheckCircle2 } from "lucide-react";
import CombinedServiceSection from "@/components/landing/CombinedServiceSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

      {/* Hero Section - Banner Centered */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30">

        {/* Main Banner Image */}
        <div className="container mx-auto px-6 py-10 relative z-10 max-w-[1200px] flex flex-col items-center">

          {/* Large Banner Image */}
          <div className="w-full max-w-[600px] mb-8">
            <img
              src="/images/project-banner.png"
              alt="Money Hunter AI - 놓친 돈을 찾아드립니다"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-[5px] w-full sm:w-auto">
            <Link href="/onboarding" className="group relative px-10 py-5 bg-gradient-to-r from-slate-900 to-blue-900 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
              <span className="relative z-10 text-xl font-extrabold tracking-tight">무료 진단 시작하기</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ width: '500px', height: '35px' }}
              className="mx-auto bg-white text-slate-700 border border-slate-300 rounded-lg font-black text-sm hover:bg-slate-50 hover:border-blue-400 hover:text-blue-700 hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              서비스 소개
            </button>
          </div>

        </div>
      </section>

      {/* Combined Services Section */}
      <div id="services" className="bg-white">
        <CombinedServiceSection />
      </div>

      {/* Footer Text */}
      <div className="py-8 text-center bg-slate-50 border-t border-slate-200">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Money Hunter AI • Trusted by 3,400+ Users
        </p>
      </div>
    </div>
  );
}
