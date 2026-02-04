import pytest
from app.services.calculator import calculator_service
from app.core.constants import ISA_TAX_FREE_LIMIT_NORMAL

def test_isa_cycle_benefit():
    # 3년 유지 시 풍차돌리기 이익 발생 테스트
    current_amount = 50_000_000
    years = 3
    conversion = 30_000_000
    
    result = calculator_service.calculate_isa_cycle_benefit(current_amount, years, conversion)
    
    # 3000만원의 10% = 300만원 공제
    assert result["pension_deduction_benefit"] == 3_000_000
    # 3년 이상이므로 재가입 비과세 이익(500만원 * 9.9% = 495,000원) 포함
    assert result["tax_free_reset_benefit"] == int(ISA_TAX_FREE_LIMIT_NORMAL * 0.099)
    assert result["recommendation"] == "해지 후 재가입 (풍차돌리기)"

def test_isa_cycle_no_benefit_short_term():
    # 2년 유지 시 풍차돌리기 추천 안 함
    years = 2
    result = calculator_service.calculate_isa_cycle_benefit(1000, years, 0)
    assert result["tax_free_reset_benefit"] == 0
    assert result["recommendation"] == "유지"

def test_overseas_tax_comparison():
    # 해외주식 1억 투자, 20% 수익 (2천만원 이익)
    inv = 100_000_000
    rate = 0.2
    
    result = calculator_service.compare_overseas_tax(inv, rate)
    
    profit = 20_000_000
    # 일반: (2000만 - 250만) * 22% = 3,850,000
    expected_normal = int((profit - 2_500_000) * 0.22)
    # ISA: (2000만 - 500만) * 9.9% = 1,485,000
    expected_isa = int((profit - ISA_TAX_FREE_LIMIT_NORMAL) * 0.099)
    
    assert result["tax_normal_account"] == expected_normal
    assert result["tax_isa_account"] == expected_isa
    assert result["saved_amount"] == expected_normal - expected_isa
