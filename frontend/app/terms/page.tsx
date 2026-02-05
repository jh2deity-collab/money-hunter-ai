export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-banking-navy">서비스 이용약관</h1>

            <div className="space-y-8 text-gray-700 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">제 1 조 (목적)</h2>
                    <p className="leading-relaxed text-sm">
                        본 약관은 Money Hunter AI(이하 "회사")가 제공하는 금융 분석 및 모의 진단 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">제 2 조 (용어의 정의)</h2>
                    <p className="leading-relaxed text-sm">
                        1. "서비스"라 함은 회사가 제공하는 AI 기반 세금/금융 진단 시뮬레이션을 의미합니다.<br />
                        2. "회원"이라 함은 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">제 3 조 (면책 조항)</h2>
                    <p className="leading-relaxed text-sm">
                        본 서비스가 제공하는 모든 분석 결과는 예측에 기반한 시뮬레이션 자료이며, 법적 효력을 갖지 않습니다. 회사는 본 서비스의 결과를 토대로 한 사용자의 투자 또는 세무 신고 결과에 대해 법적 책임을 지지 않습니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">제 4 조 (서비스 이용)</h2>
                    <p className="leading-relaxed text-sm">
                        회원은 본 서비스를 개인적인 용도로만 사용해야 하며, 상업적 목적으로 재가공하거나 배포할 수 없습니다.
                    </p>
                </section>
            </div>
        </div>
    );
}
