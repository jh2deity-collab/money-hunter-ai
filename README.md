# Money Hunter AI 💰

금융사가 알려주지 않는 숨겨진 금융 권리와 혜택을 AI가 찾아주는 스마트 진단 서비스입니다.
2026년 최신 세법과 금융 규정을 기반으로 개인 맞춤형 재무 진단을 제공합니다.

## ✨ Key Features

- **AI 재무 진단 (Onboarding)**: 10가지 핵심 질문을 통한 맞춤형 진단 및 리포트 생성
- **실시간 법령 분석**: 최신 세법 및 약관 데이터 반영
- **프리미엄 UI/UX**: 신뢰감을 주는 Fintech 디자인, 반응형 웹 (Mobile/Desktop)
- **보안**: 개인정보 암호화 및 세션 종료 시 데이터 파기

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks

### Backend
- **Framework**: FastAPI (Python)
- **Model**: OpenAI GPT-4 / LangChain (RAG Engine)
- **Database**: In-memory / Vector DB (ChromaDB)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+

### Installation & Run

#### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## 📂 Project Structure

```
money-hunter-ai/
├── backend/    # FastAPI Server & AI Engine
└── frontend/   # Next.js Web Client
```

## 📝 License

This project is licensed under the MIT License.
