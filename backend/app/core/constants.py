# 2026년 기준 법령 및 세제 혜택 상수 (하드코딩)

# 1. ISA (개인종합자산관리계좌) 관련
ISA_YEARLY_LIMIT = 40_000_000           # 연간 납입한도 상향 (기존 2천 -> 4천, 2026년 가정)
ISA_TOTAL_LIMIT = 200_000_000           # 총 납입한도 2억
ISA_TAX_FREE_LIMIT_NORMAL = 5_000_000   # 일반형 비과세 한도 (기존 200만 -> 500만)
ISA_TAX_FREE_LIMIT_FARMER = 10_000_000  # 서민/농어민형 비과세 한도 (기존 400만 -> 1000만)
ISA_PENSION_CONVERSION_DEDUCTION_RATE = 0.10  # 연금 전환 시 세액공제율 10%
ISA_PENSION_CONVERSION_DEDUCTION_LIMIT = 3_000_000 # 연금 전환 최대 공제액 300만

# 2. 연금저축/IRP 세액공제
PENSION_SAVING_LIMIT = 6_000_000        # 연금저축 납입한도
IRP_LIMIT = 3_000_000                   # IRP 추가 납입한도 (합산 900만)
TOTAL_PENSION_DEDUCTION_LIMIT = 9_000_000 # 합산 세액공제 대상 한도

# 3. 금융투자소득세 (금투세) - 2026년 폐지 가정
FINANCIAL_INVESTMENT_TAX_THRESHOLD = 50_000_000 # 기본 공제 5천만원 (참고용)

# 4. 보험 관련 (상법 개정안 등)
INSURANCE_CHILD_DEATH_COVERAGE_AGE = 15 # 15세 미만 사망보장 포함 가능 연령 기준
MILITARY_TRAINING_EXEMPTION_LIMIT_YEAR = 2025 # 군사훈련 면책 제한 조항 적용 기준 연도

# 5. UI/UX 관련 텍스트
CURRENCY_UNIT = "원"
BENEFIT_HIGHLIGHT_COLOR = "#28a745" # 에메랄드 그린
WARNING_HIGHLIGHT_COLOR = "#dc3545"
