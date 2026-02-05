export default function InquiryPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 text-banking-navy">제휴문의</h1>
            <p className="text-gray-600 mb-8">Money Hunter AI와 함께 새로운 금융 가치를 만들어갈 파트너를 찾습니다.</p>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">담당자명</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-banking-gold focus:ring-2 focus:ring-banking-gold focus:ring-opacity-50 outline-none transition-all" placeholder="이름을 입력해주세요" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">기업/기관명</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-banking-gold focus:ring-2 focus:ring-banking-gold focus:ring-opacity-50 outline-none transition-all" placeholder="기업명을 입력해주세요" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-banking-gold focus:ring-2 focus:ring-banking-gold focus:ring-opacity-50 outline-none transition-all" placeholder="contact@company.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                        <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-banking-gold focus:ring-2 focus:ring-banking-gold focus:ring-opacity-50 outline-none transition-all" placeholder="010-0000-0000" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">문의내용</label>
                        <textarea className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-banking-gold focus:ring-2 focus:ring-banking-gold focus:ring-opacity-50 outline-none transition-all h-32 resize-none" placeholder="제휴 제안 내용을 간단히 적어주세요"></textarea>
                    </div>

                    <button type="button" className="w-full bg-banking-navy text-white font-bold py-4 rounded-lg hover:bg-banking-dark transition-colors shadow-md">
                        문의하기
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-2">직접 메일로 문의하시겠습니까?</p>
                    <a href="mailto:partner@moneyhunter.ai" className="text-banking-navy font-bold hover:underline">partner@moneyhunter.ai</a>
                </div>
            </div>
        </div>
    );
}
