export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-banking-navy">개인정보처리방침</h1>

            <div className="space-y-8 text-gray-700 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm mb-6">
                    Money Hunter AI는 통신비밀보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
                </div>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">1. 수집하는 개인정보의 항목</h2>
                    <p className="leading-relaxed text-sm">
                        회사는 서비스 제공을 위해 최소한의 개인정보를 수집하고 있습니다.<br />
                        - 필수항목: 이름, 생년월일, 금융 자산 정보(입력 시)
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">2. 개인정보의 수집 및 이용목적</h2>
                    <p className="leading-relaxed text-sm">
                        수집한 개인정보는 다음의 목적을 위해 활용합니다.<br />
                        - 금융 시뮬레이션 결과 제공<br />
                        - 맞춤형 절세 리포트 생성
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">3. 개인정보의 파기절차 및 방법</h2>
                    <p className="leading-relaxed text-sm">
                        이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 관계법령에 의하여 보존할 필요가 있는 경우에는 일정 기간 동안 보존합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">4. 개인정보 보호책임자</h2>
                    <p className="leading-relaxed text-sm">
                        이름: 김보안<br />
                        소속: 보안팀<br />
                        메일: privacy@moneyhunter.ai
                    </p>
                </section>
            </div>
        </div>
    );
}
