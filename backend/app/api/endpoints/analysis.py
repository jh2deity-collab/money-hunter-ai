from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.services.calculator import calculator_service
from app.services.rag_engine import rag_engine
from app.services.pdf_service import PDFService
import os

router = APIRouter()

class ISASimulationRequest(BaseModel):
    current_amount: int
    years_maintained: int
    conversion_amount: int

class OverseasTaxRequest(BaseModel):
    investment_amount: int
    profit_rate: float

@router.post("/isa-cycle")
async def simulate_isa_cycle(request: ISASimulationRequest):
    """ISA 풍차돌리기 시뮬레이션"""
    result = calculator_service.calculate_isa_cycle_benefit(
        request.current_amount,
        request.years_maintained,
        request.conversion_amount
    )
    return result

@router.post("/overseas-tax")
async def simulate_overseas_tax(request: OverseasTaxRequest):
    """해외주식 절세 시뮬레이션"""
    result = calculator_service.compare_overseas_tax(
        request.investment_amount,
        request.profit_rate
    )
    return result

@router.get("/rag-test")
async def test_rag(query: str):
    """RAG 엔진 테스트"""
    context = await rag_engine.search(query)
    answer = await rag_engine.generate_answer(query, context)
    return {"query": query, "context": context, "answer": answer}

class ReportRequest(BaseModel):
    isa: Optional[Dict[str, Any]] = None
    overseas: Optional[Dict[str, Any]] = None
    answers: Optional[Dict[str, Any]] = None

@router.post("/report")
async def generate_report(request: ReportRequest):
    """PDF 리포트 생성 및 다운로드"""
    file_path = PDFService.generate_report(request.model_dump())
    return FileResponse(file_path, media_type="application/pdf", filename="MoneyHunter_Report.pdf")
