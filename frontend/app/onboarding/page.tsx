"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface Message {
    id: number;
    type: "bot" | "user";
    text: string;
}

interface Question {
    key: string;
    text: string;
    type: "yesno" | "number" | "selection";
    options?: { label: string; value: string }[];
}

export default function OnboardingPage() {
    const router = useRouter();

    // State for User Info Form
    const [isFormCompleted, setIsFormCompleted] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: "", phone: "", email: "" });

    // Chat State
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, type: "bot", text: "안녕하세요! 2026년 변화된 법령에 맞춰 숨겨진 혜택을 찾아드릴게요. 정확한 진단을 위해 10가지 핵심 질문을 드릴게요." },
    ]);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [inputStr, setInputStr] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // 질문 시나리오 (확장된 10개 문항)
    const questions: Question[] = [
        {
            key: "income_type",
            text: "귀하의 주요 소득 형태는 무엇인가요?",
            type: "selection",
            options: [
                { label: "근로소득 (직장인)", value: "worker" },
                { label: "사업소득 (자영업)", value: "business" },
                { label: "프리랜서/기타", value: "freelancer" }
            ]
        },
        {
            key: "income_amount",
            text: "작년 연간 총 소득(세전)은 대략 어느 구간에 해당하나요? (과세표준 구간 산정용)",
            type: "selection",
            options: [
                { label: "4,600만원 이하", value: "tier1" },
                { label: "4,600만원 ~ 8,800만원", value: "tier2" },
                { label: "8,800만원 ~ 1.5억원", value: "tier3" },
                { label: "1.5억원 초과", value: "tier4" }
            ]
        },
        {
            key: "isa",
            text: "절세 만능 통장인 ISA(개인종합자산관리계좌)를 보유하고 계신가요?",
            type: "yesno"
        },
        {
            key: "pension",
            text: "연말정산 세액공제를 위한 연금저축이나 IRP(개인형 퇴직연금) 납입액이 있으신가요?",
            type: "yesno"
        },
        {
            key: "overseas",
            text: "해외 주식(미국 주식 등) 양도소득이 건당 250만원을 초과할 것으로 예상되시나요? (예상 시 투자금액 입력, 아니면 0)",
            type: "number"
        },
        {
            key: "card_usage",
            text: "신용카드 등 사용금액 소득공제 한도 확인을 위해, 작년 총 카드 사용액을 알려주세요.",
            type: "number"
        },
        {
            key: "housing",
            text: "월세 세액공제나 주택담보대출 이자 상환액 공제 대상에 해당하시나요? (무주택 세대주 등)",
            type: "yesno"
        },
        {
            key: "dependents",
            text: "인적공제 대상 부양가족(배우자, 자녀, 60세 이상 부모님)은 본인 제외 몇 명인가요?",
            type: "number"
        },
        {
            key: "donation",
            text: "법정/지정기부금 세액공제를 받을 수 있는 정기 기부 내역이 있으신가요?",
            type: "yesno"
        },
        {
            key: "crypto",
            text: "가상자산(코인) 과세 유예 종료에 대비하여, 현재 보유 중인 가상자산 평가액이 250만원을 넘나요?",
            type: "yesno"
        }
    ];

    // State for Review Mode
    const [isReviewing, setIsReviewing] = useState(false);
    const [editTargetStep, setEditTargetStep] = useState<number | null>(null);

    useEffect(() => {
        if (!isFormCompleted) return;

        // 질문 진행 중일 때 자동 스크롤
        if (!isReviewing) {
            scrollToBottom();
        }

        // 봇 메시지 추가 로직 (일반 진행 모드일 때만)
        if (!isReviewing && editTargetStep === null && step < questions.length) {
            // 이미 해당 스텝의 봇 메시지가 있는지 확인 (중복 방지)
            const currentQText = questions[step].text;
            const hasMsg = messages.some(m => m.text === currentQText && m.type === 'bot');

            if (!hasMsg) {
                const timeout = setTimeout(() => {
                    setMessages(prev => [
                        ...prev,
                        { id: Date.now(), type: "bot", text: questions[step].text }
                    ]);
                }, 600);
                return () => clearTimeout(timeout);
            }
        }

        // 모든 질문 답변 완료 시 리뷰 모드로 진입
        if (step === questions.length && !isReviewing) {
            setIsReviewing(true);
        }
    }, [step, isFormCompleted, isReviewing, editTargetStep]);

    const handleAnswer = (value: string | number | undefined, displayText?: string) => {
        if (value === undefined) return;
        const currentQ = questions[step];

        // 사용자 메시지 표시 (수정 모드가 아닐 때만, 혹은 수정 모드여도 피드백을 위해 표시할 수 있음 - 여기선 깔끔함을 위해 생략 가능하나, 
        // 채팅 흐름상 내가 뭘 선택했는지 찍히는게 자연스러움. 단, 리뷰 모드 복귀 시에는 메시지가 너무 쌓일 수 있음.
        // 수정 모드일 때는 메시지 추가 안 하고 바로 값만 바꾸는 게 나을 수도 있음. 하지만 일관성을 위해 추가.)

        let displayValue = displayText || value.toString();
        if (currentQ.type === 'yesno') displayValue = value === 'yes' ? '네' : '아니요';
        else if (currentQ.type === 'number') {
            displayValue = `${new Intl.NumberFormat().format(Number(value))}원`;
            if (currentQ.key === 'dependents') displayValue = `${value}명`;
            if (currentQ.key === 'overseas' && value == 0) displayValue = "0원 (해당 없음)";
        }

        if (editTargetStep === null) {
            setMessages(prev => [...prev, { id: Date.now(), type: "user", text: displayValue }]);
        }

        // 답변 저장
        setAnswers((prev: any) => ({ ...prev, [currentQ.key]: value }));

        // 로직 분기: 수정 모드 vs 일반 모드
        if (editTargetStep !== null) {
            // 수정 완료 -> 리뷰 모드로 복귀
            setEditTargetStep(null);
            setIsReviewing(true);
            setStep(questions.length); // 단, setStep을 끝으로 보내야 함
        } else {
            // 다음 단계로
            setStep(prev => prev + 1);
        }
    };

    const handleEdit = (idx: number) => {
        setIsReviewing(false);
        setEditTargetStep(idx);
        setStep(idx);
        // 수정 모드 진입 시, 채팅창에 해당 질문이 다시 나오게 하거나, 
        // UI상으로 현재 스텝만 활성화해서 보여줘야 함.
        // 현재 구조상 step이 바뀌면 renderControls가 해당 스텝의 컨트롤을 렌더링함.
        // 봇 메시지는 추가하지 않아도 기존 채팅 내역에 질문이 있음.
        // 하지만 사용자가 헷갈리지 않게 "수정 모드: [질문내용]" 같은 안내가 있으면 좋음.
        // 여기선 간단히 컨트롤만 활성화.
    };

    const handleFinalSubmit = () => {
        // 실제로는 백엔드로 데이터 전송 후 ID 받아서 이동
        const finalData = { ...answers, userInfo };
        const query = encodeURIComponent(JSON.stringify(finalData));
        window.location.href = `/result?data=${query}`;
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo.name && userInfo.phone && userInfo.email) {
            setIsFormCompleted(true);
        } else {
            alert("모든 정보를 입력해 주세요.");
        }
    };

    // ... (Agreement Form Render Code - Unchanged)
    if (!isFormCompleted) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-center">
                <div className="max-w-[1000px] w-full bg-white shadow-xl rounded-sm overflow-hidden border-t-4 border-banking-navy" style={{ maxWidth: '1000px' }}>
                    <div className="p-8 border-b border-gray-100 text-center">
                        <h2 className="text-2xl font-serif font-bold text-banking-navy mb-2">투자성향 및 재무 진단</h2>
                        <p className="text-sm text-gray-500">
                            금융소비자 보호법 및 관련 규정에 의거하여,<br />
                            귀하의 재무 상태를 정확히 진단하기 위한 절차입니다.
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="p-8 space-y-8">
                        {/* ... (Previous Form Content) ... */}
                        {/* Simplified for brevity in replace block, assuming context match works. 
                            Actually, I need to match exact context or replace whole function. 
                            Since I'm replacing a huge chunk, I'll include the form JSX logic.
                        */}
                        {/* 1. Agreement Section */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="pt-0.5">
                                    <input type="checkbox" id="agree1" required className="w-4 h-4 text-banking-navy focus:ring-banking-navy border-gray-300 rounded" />
                                </div>
                                <label htmlFor="agree1" className="text-sm text-gray-700 leading-snug cursor-pointer">
                                    <span className="text-banking-navy font-bold">[필수]</span> 개인(신용)정보 수집·이용 동의서
                                    <p className="text-xs text-gray-500 mt-1">
                                        수집된 정보는 진단 리포트 생성 목적 외에는 사용되지 않으며,
                                        관련 법령에 따라 안전하게 파기됩니다.
                                    </p>
                                </label>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="pt-0.5">
                                    <input type="checkbox" id="agree2" required className="w-4 h-4 text-banking-navy focus:ring-banking-navy border-gray-300 rounded" />
                                </div>
                                <label htmlFor="agree2" className="text-sm text-gray-700 leading-snug cursor-pointer">
                                    <span className="text-banking-navy font-bold">[필수]</span> 민감정보 처리 동의
                                </label>
                            </div>
                        </div>

                        {/* 2. User Info Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-banking-navy/80 uppercase tracking-widest mb-2">Name</label>
                                <input
                                    type="text"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-navy focus:border-transparent outline-none transition-all font-bold text-banking-navy"
                                    placeholder="성명을 입력하세요"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-banking-navy/80 uppercase tracking-widest mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={userInfo.phone}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        let formattedPhone = "";
                                        if (value.length <= 3) {
                                            formattedPhone = value;
                                        } else if (value.length <= 7) {
                                            formattedPhone = `${value.slice(0, 3)}-${value.slice(3)}`;
                                        } else {
                                            formattedPhone = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
                                        }
                                        setUserInfo({ ...userInfo, phone: formattedPhone });
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-navy focus:border-transparent outline-none transition-all font-bold text-banking-navy"
                                    placeholder="010-0000-0000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-banking-navy/80 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-navy focus:border-transparent outline-none transition-all font-bold text-banking-navy"
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4 bg-banking-navy text-white text-2xl font-serif font-bold rounded-xl shadow-lg hover:bg-[#2c3140] transition-all transform hover:-translate-y-1"
                            >
                                진단 시작하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Logic for rendering controls
    const renderControls = (questionType: string) => {
        const currentQ = questions[step];

        // 수정 모드일 때 현재 값이 있다면 초기값으로 세팅해주는 로직 필요
        // 하지만 inputStr은 state라서 여기서 바로 제어하기 까다로움.
        // useEffect로 step 변경 시 inputStr 초기화 로직을 추가하는게 좋음.

        if (questionType === "yesno") {
            return (
                <div className="flex gap-2 min-w-[200px]">
                    <button
                        onClick={() => handleAnswer("yes")}
                        className="flex-1 py-3 bg-banking-navy text-white hover:bg-[#2c3140] rounded-xl font-bold transition-all shadow-sm hover:shadow-md text-sm"
                    >
                        네
                    </button>
                    <button
                        onClick={() => handleAnswer("no")}
                        className="flex-1 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-bold transition-all shadow-sm hover:shadow-md text-sm"
                    >
                        아니요
                    </button>
                </div>
            );
        }
        if (questionType === "selection" && currentQ.options) {
            return (
                <div className="flex flex-col gap-2 min-w-[200px]">
                    {currentQ.options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleAnswer(opt.value, opt.label)}
                            className="w-full py-3 bg-white border border-gray-200 hover:bg-banking-navy hover:text-white hover:border-transparent text-gray-700 rounded-xl font-bold transition-all shadow-sm text-sm text-left px-4"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            );
        }
        if (questionType === "number") {
            const isCount = currentQ.key === 'dependents';
            return (
                <div className="flex gap-2 min-w-[260px]">
                    <input
                        type="text"
                        value={inputStr}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            setInputStr(val ? new Intl.NumberFormat().format(parseInt(val)) : "");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && inputStr) {
                                const numStr = inputStr.replace(/,/g, "");
                                handleAnswer(parseInt(numStr));
                                setInputStr("");
                            }
                        }}
                        placeholder={isCount ? "명" : "금액 (원)"}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-banking-gold text-right font-medium text-gray-700 bg-white"
                        autoFocus
                    />
                    <button
                        onClick={() => {
                            if (inputStr) {
                                const numStr = inputStr.replace(/,/g, "");
                                handleAnswer(parseInt(numStr));
                                setInputStr("");
                            }
                        }}
                        disabled={!inputStr}
                        className="px-4 bg-banking-navy text-white rounded-xl disabled:opacity-50 text-sm font-bold whitespace-nowrap hover:bg-[#2c3140] transition-colors"
                    >
                        입력
                    </button>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex-1 flex flex-col bg-[#f8f9fc] max-w-[1000px] mx-auto w-full shadow-2xl overflow-hidden rounded-2xl my-8 border border-white/50 h-[800px]" style={{ maxWidth: '1000px' }}>
            {/* Header */}
            <div className="bg-banking-navy p-4 text-center text-white relative overflow-hidden flex-shrink-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-banking-gold blur-xl"></div>
                <h3 className="text-lg font-bold relative z-10">AI 진단 엔진</h3>
                <p className="text-xs text-white/60 relative z-10 w-full">
                    {isReviewing ? "답변 확인 및 수정" : `진행률 ${Math.round((step / questions.length) * 100)}%`}
                </p>
                <div className="absolute bottom-0 left-0 h-1 bg-banking-gold transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }}></div>
            </div>

            {/* Review Mode UI */}
            {isReviewing ? (
                <div className="flex-1 overflow-y-auto p-6 bg-white animate-fade-in-up">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-banking-navy mb-2">모든 답변이 완료되었습니다!</h2>
                        <p className="text-gray-500 text-sm">
                            제출하기 전에 입력하신 내용을 확인해 주세요.<br />
                            수정이 필요한 항목은 <strong>[수정]</strong> 버튼을 눌러 변경할 수 있습니다.
                        </p>
                    </div>

                    <div className="space-y-4 mb-10">
                        {questions.map((q, idx) => {
                            const answer = answers[q.key];
                            let answerText = answer;
                            if (q.type === 'yesno') answerText = answer === 'yes' ? '네' : '아니요';
                            else if (q.type === 'selection') {
                                const opt = q.options?.find(o => o.value === answer);
                                if (opt) answerText = opt.label;
                            }
                            else if (q.type === 'number') {
                                answerText = `${new Intl.NumberFormat().format(Number(answer))}원`;
                                if (q.key === 'dependents') answerText = `${answer}명`;
                                if (q.key === 'overseas' && answer == 0) answerText = "0원 (해당 없음)";
                            }
                            else if (answer === undefined) answerText = "(미입력)";

                            return (
                                <div key={q.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-banking-gold/30 transition-colors group">
                                    <div className="flex-1 pr-4">
                                        <div className="text-xs text-gray-400 font-bold mb-1">Q{idx + 1}</div>
                                        <div className="text-sm text-gray-800 font-medium">{q.text}</div>
                                        <div className="text-banking-navy font-bold mt-1 text-base">{answerText}</div>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(idx)}
                                        className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-banking-navy hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition-all"
                                    >
                                        수정
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100">
                        <button
                            onClick={handleFinalSubmit}
                            className="w-full py-4 bg-banking-navy text-white text-lg font-bold rounded-2xl shadow-xl hover:bg-[#2c3140] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                        >
                            <span>진단 결과 확인하기</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                /* Chat Mode UI (Existing) */
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f9fc]">

                    {/* Initial Greeting */}
                    {step === 0 && (
                        <div className="flex items-start gap-4 animate-fade-in-up">
                            <div className="w-10 h-10 rounded-full bg-banking-gold flex items-center justify-center text-banking-navy font-bold flex-shrink-0 shadow-sm">
                                AI
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%] text-gray-700 leading-relaxed">
                                안녕하세요! 2026년 변화된 법령에 맞춰 숨겨진 혜택을 찾아드릴게요. 핵심 질문 10가지만 답변해 주시면 됩니다.
                            </div>
                        </div>
                    )}

                    {/* Question History & Current Question */}
                    {questions.map((q, idx) => {
                        // Show only questions up to current step
                        if (idx > step) return null;

                        // 수정 모드일 때는 해당 질문(editTargetStep)만 보여주거나, 
                        // UX상 전체 기록을 보여주되 현재 스텝만 활성화하는게 나음.
                        // 여기선 chat history 처럼 다 보여주되, 현재 질문만 input 가능.

                        const isCurrent = idx === step;
                        const answer = answers[q.key];

                        return (
                            <div key={q.key} className={`flex flex-col gap-4 animate-fade-in-up ${isCurrent ? 'opacity-100' : 'opacity-60 grayscale-[0.5]'}`}>
                                {/* Question Row */}
                                <div className="flex items-start gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-banking-navy flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm text-sm">
                                        Q{idx + 1}
                                    </div>

                                    {/* Question Box */}
                                    <div className={`flex-1 p-4 rounded-2xl rounded-tl-none shadow-sm border text-gray-800 font-medium leading-relaxed ${isCurrent ? 'bg-white border-banking-gold/50 ring-2 ring-banking-gold/10' : 'bg-gray-50 border-gray-100'}`}>
                                        {q.text}
                                    </div>
                                </div>

                                {/* Active Controls: Positioned RIGHT/Below of the question */}
                                {isCurrent && (
                                    <div className="pl-14 animate-fade-in-up">
                                        {renderControls(q.type)}
                                        {editTargetStep !== null && (
                                            <p className="text-xs text-banking-gold mt-2 font-bold ml-1">
                                                * 답변을 수정 중입니다. 입력 후 자동 저장됩니다.
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Answer History Display (Not current) */}
                                {!isCurrent && answer !== undefined && (
                                    <div className="flex justify-end animate-fade-in-up">
                                        <div className="bg-banking-navy text-white px-6 py-2 rounded-xl rounded-tr-none font-bold text-sm shadow-sm inline-block max-w-[80%]">
                                            {(() => {
                                                if (q.type === 'yesno') return answer === 'yes' ? '네' : '아니요';
                                                if (q.type === 'selection') {
                                                    const opt = q.options?.find(o => o.value === answer);
                                                    return opt ? opt.label : answer;
                                                }
                                                if (q.key === 'dependents') return `${answer}명`;
                                                if (q.key === 'overseas' && answer == 0) return "0원 (해당 없음)";
                                                return `${new Intl.NumberFormat().format(Number(answer))}원`;
                                            })()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
}
