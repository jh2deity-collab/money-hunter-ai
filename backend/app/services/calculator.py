from app.core.constants import (
    ISA_TAX_FREE_LIMIT_NORMAL,
    ISA_PENSION_CONVERSION_DEDUCTION_RATE,
    ISA_PENSION_CONVERSION_DEDUCTION_LIMIT,
    TOTAL_PENSION_DEDUCTION_LIMIT,
    BENEFIT_HIGHLIGHT_COLOR
)

class TaxCalculator:
    @staticmethod
    def calculate_isa_cycle_benefit(
        current_amount: int, 
        years_maintained: int, 
        conversion_amount: int
    ) -> dict:
        """
        ISA '풍차돌리기' (3년 주기 해지 및 재가입) 시뮬레이션
        :param current_amount: 현재 ISA 평가액
        :param years_maintained: 가입 유지 기간 (년)
        :param conversion_amount: 만기 자금 중 연금 전환 금액
        :return: 분석 결과 딕셔너리
        """
        
        # 1. 연금 전환 세액공제 계산
        # 전환 금액의 10%와 300만원 중 작은 값
        pension_deduction = min(
            int(conversion_amount * ISA_PENSION_CONVERSION_DEDUCTION_RATE), 
            ISA_PENSION_CONVERSION_DEDUCTION_LIMIT
        )
        
        # 2. 비과세 한도 초기화 이익 (재가입 가정)
        # 3년이 지났다면 해지 후 재가입 시 비과세 한도(500만원)를 다시 적용받을 수 있음.
        # 단순히 500만원에 대한 세금(9.9% or 15.4%)을 아끼는 것으로 가정 (보수적 접근)
        # ISA 일반형 세율 9.9% 가정 시
        reset_benefit = int(ISA_TAX_FREE_LIMIT_NORMAL * 0.099) if years_maintained >= 3 else 0
        
        total_benefit = pension_deduction + reset_benefit
        
        recommendation = "유지"
        if years_maintained >= 3:
            recommendation = "해지 후 재가입 (풍차돌리기)"
        
        return {
            "pension_deduction_benefit": pension_deduction,
            "tax_free_reset_benefit": reset_benefit,
            "total_estimated_benefit": total_benefit,
            "recommendation": recommendation,
            "highlight_color": BENEFIT_HIGHLIGHT_COLOR
        }

    @staticmethod
    def compare_overseas_tax(investment_amount: int, profit_rate: float) -> dict:
        """
        해외주식/ETF 절세 시뮬레이션 (일반계좌 vs ISA/연금)
        :param investment_amount: 투자 원금
        :param profit_rate: 예상 수익률 (0.1 = 10%)
        """
        profit = int(investment_amount * profit_rate)
        
        # 1. 일반 계좌 (해외주식 양도소득세 22%, 기본공제 250만원 제외)
        taxable_profit_normal = max(profit - 2_500_000, 0)
        tax_normal = int(taxable_profit_normal * 0.22)
        
        # 2. ISA/연금 계좌 (과세이연 및 저율과세)
        # ISA 내 해외투자형 ETF라고 가정 시, 매매차익은 배당소득세(9.9%) 분리과세
        # 비과세 한도 500만원 적용
        taxable_profit_isa = max(profit - ISA_TAX_FREE_LIMIT_NORMAL, 0)
        tax_isa = int(taxable_profit_isa * 0.099)
        
        saved_tax = tax_normal - tax_isa
        
        return {
            "profit": profit,
            "tax_normal_account": tax_normal,
            "tax_isa_account": tax_isa,
            "saved_amount": saved_tax,
            "message": f"절세 계좌 활용 시 {saved_tax:,}원을 더 벌 수 있습니다."
        }

calculator_service = TaxCalculator()
