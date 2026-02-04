from typing import List, Dict

class RAGEngine:
    def __init__(self):
        # Mock Vector DB (Key-Value 형태)
        self.mock_db = {
            "isa": "2026년 세법개정안에 따라 ISA 납입한도가 연 4천만원, 총 2억원으로 상향되었습니다. 비과세 한도도 일반형 기준 500만원으로 확대되었습니다.",
            "insurance": "상법 개정으로 15세 미만 피보험자의 사망을 보험사고로 하는 보험계약이 일부 허용되었습니다. 또한 군사훈련 중 발생한 민간인 피해에 대해 면책 조항 적용이 제한됩니다.",
            "pension": "ISA 만기 자금을 연금계좌로 전환 시, 전환 금액의 10%(최대 300만원)를 추가로 세액공제 받을 수 있습니다."
        }

    async def search(self, query: str) -> List[str]:
        """
        쿼리와 관련된 법령/약관 정보를 검색합니다. (Mock)
        """
        results = []
        for key, value in self.mock_db.items():
            if key in query.lower() or query in value:
                results.append(value)
        
        if not results:
            # 기본값으로 전체를 줄 수도 있지만, 여기선 빈 리스트
            pass
            
        return results

    async def generate_answer(self, query: str, context: List[str]) -> str:
        """
        검색된 컨텍스트를 기반으로 답변을 생성합니다. (Mock)
        """
        if not context:
            return "관련된 법령 정보를 찾을 수 없습니다."
        
        # 간단한 Mock 응답 생성
        return f"검색된 법령 정보에 따르면: {' '.join(context)}"

rag_engine = RAGEngine()
