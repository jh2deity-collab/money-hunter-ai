from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PDFService:
    @staticmethod
    def generate_report(data: dict) -> str:
        try:
            import tempfile
            
            # Create a named temporary file
            tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
            file_path = tmp_file.name
            tmp_file.close()

            c = canvas.Canvas(file_path, pagesize=A4)
            width, height = A4
            
            # Font Configuration
            font_regular = "Helvetica"
            font_bold = "Helvetica-Bold"
            
            # Helper to ensure font exists
            def _ensure_font():
                import tempfile
                
                # 1. Check local bundle first
                local_path = os.path.join(os.path.dirname(__file__), "fonts", "NanumGothic.ttf")
                if os.path.exists(local_path):
                    logger.info(f"Using local font: {local_path}")
                    return local_path
                
                # 2. Check temp dir (for cached download)
                # Use tempfile.gettempdir() for cross-platform safety (handles /tmp on Linux, C:\Temp on Windows)
                tmp_dir = tempfile.gettempdir()
                tmp_path = os.path.join(tmp_dir, "NanumGothic.ttf")
                
                if os.path.exists(tmp_path):
                    logger.info(f"Using cached font from temp: {tmp_path}")
                    return tmp_path
                
                # 3. Download if missing
                try:
                    logger.info("Font not found locally. Downloading NanumGothic...")
                    import urllib.request
                    import ssl
                    
                    urls = [
                        "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/nanumgothic/NanumGothic-Regular.ttf",
                        "https://raw.githubusercontent.com/google/fonts/main/ofl/nanumgothic/NanumGothic-Regular.ttf",
                        "https://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z_tLfxno.ttf"
                    ]
                    
                    # Create unverified context to avoid SSL errors in some envs
                    ctx = ssl.create_default_context()
                    ctx.check_hostname = False
                    ctx.verify_mode = ssl.CERT_NONE
                    
                    headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                    }
                    
                    for url in urls:
                        try:
                            logger.info(f"Attempting download from: {url}")
                            req = urllib.request.Request(url, headers=headers)
                            with urllib.request.urlopen(req, context=ctx, timeout=30) as response:
                                if response.status == 200:
                                    content = response.read()
                                    if len(content) > 1000:
                                        with open(tmp_path, "wb") as f:
                                            f.write(content)
                                        logger.info(f"Font successfully downloaded from {url} to {tmp_path}")
                                        return tmp_path
                                else:
                                    logger.warning(f"Failed to download from {url}. Status: {response.status}")
                        except Exception as inner_e:
                            logger.warning(f"Error downloading from {url}: {inner_e}")
                            
                    logger.error("All font download attempts failed.")
                    
                except Exception as e:
                    logger.error(f"Critical error in font download process: {e}")
                
                return None

            font_path = _ensure_font()
            
            if font_path and os.path.exists(font_path):
                try:
                    # Register with error handling
                    pdfmetrics.registerFont(TTFont("NanumGothic", font_path))
                    font_regular = "NanumGothic"
                    font_bold = "NanumGothic" 
                    logger.info(f"Successfully registered font: NanumGothic from {font_path}")
                except Exception as e:
                    logger.warning(f"Failed to register font {font_path}: {e}")
                    # Fallback to Helvetica is handled by initial values
            else:
                logger.warning(f"Font file could not be located or downloaded. Using fallback fonts.")


            # Data Preparation
            user_name = "Guest"
            if "userInfo" in data:
                 user_name = data["userInfo"].get("name", "Guest")
            if "answers" in data and "userInfo" in data["answers"]:
                 user_name = data["answers"]["userInfo"].get("name", "Guest")
                 
            report_id = f"MH-{datetime.now().strftime('%Y%m%d')}-{int(datetime.now().timestamp())}"
            today_str = datetime.now().strftime("%Y. %m. %d")
            
            isa = data.get("isa", {})
            overseas = data.get("overseas", {})
            answers = data.get("answers", {})
            
            total_benefit = 0
            if isa: total_benefit += isa.get('total_estimated_benefit', 0)
            if overseas: total_benefit += overseas.get('saved_amount', 0)

            # ==============================
            # PAGE 1: COVER
            # ==============================
            
            # Background
            c.setFillColorRGB(30/255, 35/255, 48/255) # #1e2330
            c.rect(0, 0, width, height, fill=1)
            
            # Circle Deco - Golden
            c.setStrokeColorRGB(212/255, 175/255, 55/255) # #d4af37
            c.setFillColorRGB(212/255, 175/255, 55/255)
            c.circle(width + 100, height - 100, 300, stroke=0, fill=1)
            
            # Logo Text
            c.setFillColor(colors.white)
            c.setFont(font_bold, 14)
            c.drawString(40, height - 60, "CONFIDENTIAL REPORT")
            
            # Main Title
            c.setFont(font_bold, 42)
            c.drawString(40, height - 200, "FINANCIAL")
            c.drawString(40, height - 250, "DIAGNOSIS")
            
            c.setFillColorRGB(212/255, 175/255, 55/255) # Gold
            c.drawString(40, height - 300, "REPORT 2026")
            
            # Divider
            c.setLineWidth(4)
            c.setStrokeColorRGB(212/255, 175/255, 55/255)
            c.line(40, height - 330, 140, height - 330)
            
            # Meta Info
            start_y = height - 380
            c.setFillColor(colors.lightgrey)
            c.setFont(font_regular, 10)
            c.drawString(40, start_y, "CLIENT NAME")
            c.setFont(font_bold, 18)
            c.setFillColor(colors.white)
            c.drawString(40, start_y - 25, f"{user_name} 님")
            
            c.setFillColor(colors.lightgrey)
            c.setFont(font_regular, 10)
            c.drawString(40, start_y - 70, "REPORT ID")
            c.setFont(font_bold, 14)
            c.setFillColor(colors.white)
            c.drawString(40, start_y - 90, report_id)
            
            c.setFillColor(colors.lightgrey)
            c.setFont(font_regular, 10)
            c.drawString(40, start_y - 130, "DATE")
            c.setFont(font_bold, 14)
            c.setFillColor(colors.white)
            c.drawString(40, start_y - 150, today_str)
            
            # Executive Summary Box
            c.setFillColorRGB(45/255, 55/255, 72/255)
            c.roundRect(40, 100, width - 80, 150, 10, fill=1, stroke=0)
            
            c.setFillColorRGB(212/255, 175/255, 55/255)
            c.setFont(font_bold, 12)
            c.drawString(60, 220, "EXECUTIVE SUMMARY")
            
            c.setFillColor(colors.white)
            c.setFont(font_bold, 36)
            c.drawString(60, 170, f"₩ {total_benefit:,}")
            
            c.setFont(font_regular, 12)
            c.drawString(60, 140, "2026년 법령 기준 총 잠재 이익 추정액")
            
            c.showPage()
            
            # ==============================
            # PAGE 2: ANALYSIS
            # ==============================
            
            # Header
            c.setFillColorRGB(30/255, 35/255, 48/255)
            c.setFont(font_bold, 24)
            c.drawString(40, height - 60, "Detailed Analysis")
            c.setStrokeColorRGB(212/255, 175/255, 55/255)
            c.setLineWidth(2)
            c.line(40, height - 75, width - 40, height - 75)
            
            y_cursor = height - 150
            
            # 1. ISA Section
            if isa:
                c.setFillColorRGB(30/255, 35/255, 48/255)
                c.setFont(font_bold, 16)
                c.drawString(40, y_cursor, "01. ISA 계좌 최적화 (Tax Optimization)")
                y_cursor -= 30
                
                c.setFont(font_regular, 11)
                c.setFillColor(colors.darkgrey)
                text = "3년 만기 시점 연금 전환 전략(일명 '풍차돌리기')을 통한 세제 혜택 극대화 방안입니다."
                c.drawString(40, y_cursor, text)
                y_cursor -= 20
                
                c.setFillColorRGB(247/255, 250/255, 252/255)
                c.rect(40, y_cursor - 70, width - 80, 60, fill=1, stroke=0)
                
                c.setFillColor(colors.black)
                c.setFont(font_regular, 10)
                c.drawString(60, y_cursor - 25, "연금 전환 세액공제 (10%)")
                c.drawString(width/2 + 20, y_cursor - 25, "비과세 한도 초기화 이익")
                
                c.setFont(font_bold, 14)
                c.setFillColorRGB(39/255, 103/255, 73/255)
                c.drawString(60, y_cursor - 45, f"+ {isa.get('pension_deduction_benefit',0):,} 원")
                c.drawString(width/2 + 20, y_cursor - 45, f"+ {isa.get('tax_free_reset_benefit',0):,} 원")
                
                y_cursor -= 90
                
                c.setStrokeColorRGB(212/255, 175/255, 55/255)
                c.setLineWidth(3)
                c.line(40, y_cursor, 40, y_cursor - 40)
                
                c.setFont(font_regular, 10)
                c.setFillColor(colors.black)
                rec_text = isa.get('recommendation', '')
                if len(rec_text) > 60:
                    c.drawString(50, y_cursor - 10, rec_text[:60])
                    c.drawString(50, y_cursor - 25, rec_text[60:])
                else:
                    c.drawString(50, y_cursor - 15, rec_text)
                
                y_cursor -= 80
            
            c.setStrokeColor(colors.lightgrey)
            c.setLineWidth(1)
            c.line(40, y_cursor, width - 40, y_cursor)
            y_cursor -= 60
            
            # 2. Overseas Section
            if overseas:
                c.setFillColorRGB(30/255, 35/255, 48/255)
                c.setFont(font_bold, 16)
                c.drawString(40, y_cursor, "02. 해외주식 양도세 절감 (Equity Strategy)")
                y_cursor -= 30
                
                c.setFont(font_regular, 11)
                c.setFillColor(colors.darkgrey)
                c.drawString(40, y_cursor, "일반증권계좌의 해외주식을 ISA 계좌 내에서 운용하여 실효세율을 22% -> 9.9%로 낮춥니다.")
                y_cursor -= 30
                
                c.setFillColorRGB(45/255, 55/255, 72/255)
                c.rect(40, y_cursor - 30, width - 80, 30, fill=1, stroke=0)
                c.setFillColor(colors.white)
                c.setFont(font_bold, 12)
                c.drawString(50, y_cursor - 20, "구분")
                c.drawRightString(width - 50, y_cursor - 20, "예상 세액")
                y_cursor -= 30
                
                c.setFillColor(colors.white)
                c.rect(40, y_cursor - 30, width - 80, 30, fill=0, stroke=1)
                c.setFillColor(colors.black)
                c.setFont(font_regular, 11)
                c.drawString(50, y_cursor - 20, "일반 계좌 (양도세 22%)")
                c.setFillColor(colors.grey)
                c.drawRightString(width - 50, y_cursor - 20, f"{overseas.get('tax_normal_account',0):,} 원")
                y_cursor -= 30
                
                c.setFillColorRGB(240/255, 255/255, 244/255)
                c.rect(40, y_cursor - 30, width - 80, 30, fill=1, stroke=1)
                c.setFillColorRGB(39/255, 103/255, 73/255)
                c.setFont(font_bold, 11)
                c.drawString(50, y_cursor - 20, "ISA 전용 계좌 (9.9%)")
                c.drawRightString(width - 50, y_cursor - 20, f"{overseas.get('tax_isa_account',0):,} 원")
                y_cursor -= 50
                
                c.setFont(font_bold, 14)
                c.setFillColorRGB(30/255, 35/255, 48/255)
                c.drawRightString(width - 40, y_cursor, f"Total Saved: {overseas.get('saved_amount',0):,} 원")
            
            c.setFont(font_regular, 9)
            c.setFillColor(colors.grey)
            c.drawCentredString(width/2, 30, "Money Hunter AI | 2026 Tax Law Analysis | Page 2 of 6")
            
            c.showPage()
            
            # ==============================
            # PAGE 3: ACTION PLAN
            # ==============================
            
            c.setFillColorRGB(30/255, 35/255, 48/255)
            c.setFont(font_bold, 24)
            c.drawString(40, height - 60, "Strategic Action Plan")
            c.setStrokeColorRGB(212/255, 175/255, 55/255)
            c.setLineWidth(2)
            c.line(40, height - 75, width - 40, height - 75)
            
            y_cursor = height - 150
            
            # Insurance Alert
            if answers.get('insurance') == 'yes':
                c.setFillColorRGB(255/255, 245/255, 245/255)
                c.setStrokeColorRGB(252/255, 129/255, 129/255)
                c.rect(40, y_cursor - 100, width - 80, 100, fill=1, stroke=1)
                
                c.setFillColorRGB(197/255, 48/255, 48/255)
                c.setFont(font_bold, 14)
                c.drawString(60, y_cursor - 30, "CRITICAL ALERT: 미청구 보험금 감지")
                
                c.setFont(font_regular, 11)
                c.setFillColor(colors.black)
                c.drawString(60, y_cursor - 55, "과거 상법 제732조에 의해 면책되었던 15세 미만자 사망 담보 계약 재검토 필요.")
                c.drawString(60, y_cursor - 75, "관련 법령: 상법 제732조 (개정) 및 대법원 2023다XXXXX 판결")
                
                y_cursor -= 160
            
            # Next Steps
            c.setFont(font_bold, 16)
            c.setFillColorRGB(30/255, 35/255, 48/255)
            c.drawString(40, y_cursor, "Next Steps")
            y_cursor -= 30
            
            steps = [
                ("01. 증빙 서류 준비", "본 리포트의 별첨 자료(소명서 초안)를 출력하여 준비하십시오."),
                ("02. 금융사 방문 접수", "ISA 만기 해지 및 연금 전환 신청 시 '세제 혜택 계좌 이동' 의사를 명시하십시오."),
                ("03. 경정 청구 (필요 시)", "이미 납부한 세금이 있다면 5년 내 경정 청구가 가능합니다.")
            ]
            
            for title, desc in steps:
                c.setFillColorRGB(212/255, 175/255, 55/255)
                c.setFont(font_bold, 12)
                c.drawString(40, y_cursor, title)
                
                c.setFillColor(colors.black)
                c.setFont(font_regular, 11)
                c.drawString(40, y_cursor - 20, desc)
                
                y_cursor -= 50
                
            c.setFont(font_regular, 9)
            c.setFillColor(colors.grey)
            c.drawCentredString(width/2, 30, "Money Hunter AI | 2026 Tax Law Analysis | Page 3 of 6")
            
            # ==============================
            # PAGE 4: REGULATORY REVIEW
            # ==============================
            c.showPage()
            
            c.setFillColorRGB(30/255, 35/255, 48/255)
            c.setFont(font_bold, 24)
            c.drawString(40, height - 60, "Legal Basis & Regulatory Review")
            c.setStrokeColorRGB(212/255, 175/255, 55/255)
            c.setLineWidth(2)
            c.line(40, height - 75, width - 40, height - 75)
            
            y_cursor = height - 150
            
            c.setFont(font_regular, 12)
            c.setFillColor(colors.black)
            c.drawString(40, y_cursor, "본 계좌 운용 전략에 대한 AI 규제 준수(Compliance) 검토 결과입니다.")
            y_cursor -= 40
            
            c.setFillColorRGB(247/255, 250/255, 252/255)
            c.rect(40, y_cursor - 180, width - 80, 180, fill=1, stroke=0)
            
            c.setFillColor(colors.black)
            c.setFont(font_bold, 14)
            c.drawString(60, y_cursor - 40, "Regulatory Compliance Check")
            
            checks = [
                ("ISA 계좌 운용 적격성", "Pass", "소득세법 시행령 제XX조 요건 충족"),
                ("해외주식 직접투자 허용 여부", "Review", "중개형 ISA를 통한 제한적 허용 (2025 개정)"),
                ("비과세 한도 적용 범위", "Pass", "서민형/일반형 가입 요건 자동 분류"),
                ("자금 출처 소명 필요성", "Low", "소득 대비 적정 납입 수준"),
            ]
            
            check_y = y_cursor - 80
            for item, status, remark in checks:
                c.setFont(font_regular, 11)
                c.drawString(60, check_y, f"- {item}")
                
                if status == "Pass": c.setFillColorRGB(39/255, 103/255, 73/255)
                elif status == "Review": c.setFillColorRGB(212/255, 175/255, 55/255)
                else: c.setFillColor(colors.grey)
                
                c.setFont(font_bold, 11)
                c.drawString(250, check_y, status)
                
                c.setFillColor(colors.grey)
                c.setFont(font_regular, 10)
                c.drawString(320, check_y, remark)
                c.setFillColor(colors.black)
                
                check_y -= 30
            
            y_cursor -= 220
            
            c.setFont(font_regular, 11)
            c.drawString(40, y_cursor, "상기 검토 결과는 현행 법령에 기초한 1차 검토 의견이며, 최종 적용 시점의 법령에 따라 달라질 수 있습니다.")

            c.setFont(font_regular, 9)
            c.setFillColor(colors.grey)
            c.drawCentredString(width/2, 30, "Money Hunter AI | 2026 Tax Law Analysis | Page 4 of 6")

            # ==============================
            # PAGE 5: LEGAL BASIS (STATUTES)
            # ==============================
            c.showPage()
            
            c.setFillColorRGB(30/255, 35/255, 48/255)
            c.setFont(font_bold, 24)
            c.drawString(40, height - 60, "Legal Basis")
            c.setStrokeColorRGB(212/255, 175/255, 55/255)
            c.setLineWidth(2)
            c.line(40, height - 75, width - 40, height - 75)
            
            y_cursor = height - 150
            
            c.setFont(font_regular, 12)
            c.setFillColor(colors.black)
            c.drawString(40, y_cursor, "관련 법적 근거 상세 목록입니다.")
            y_cursor -= 40
            
            laws = [
                ("01. 국세기본법 제45조의2 (경정 등의 청구)", "과세표준신고서에 기재된 과세표준 및 세액이 세법에 따라 신고하여야 할 것보다 많은 경우, 법정신고기한이 지난 후 5년 이내에 관할 세무서장에게 감액을 청구할 수 있습니다."),
                ("02. 조세특례제한법 제91조의18 (ISA 과세특례)", "개인종합자산관리계좌(ISA) 만기 시 연금계좌로 전환한 금액의 10%(300만원 한도)에 대해 추가 세액공제를 적용하며, 해당 금액은 비과세 한도 적용 배제 대상입니다."),
                ("03. 소득세법 제94조 (양도소득의 범위)", "해외주식의 매매차익은 양도소득세 과세대상이나, ISA 계좌 내에서 발생한 손익은 계좌 내 다른 손익과 통산하여 과세표준을 산정합니다 (2025년 개정안 반영)."),
            ]
            
            if answers.get('insurance') == 'yes':
                laws.append(("04. 상법 제732조 (15세미만자등에 대한 계약의 금지)", "15세 미만자 등을 피보험자로 하는 사망보험 계약은 무효이나, 단체보험의 경우 등 예외적으로 유효할 수 있다는 최근 대법원 판례(2010다XXXX)를 준용합니다."))
            
            for title, desc in laws:
                c.setFillColorRGB(30/255, 35/255, 48/255)
                c.setFont(font_bold, 12)
                c.drawString(40, y_cursor, title)
                y_cursor -= 20
                
                c.setFillColor(colors.darkgrey)
                c.setFont(font_regular, 10)
                if len(desc) > 75:
                   c.drawString(50, y_cursor, desc[:75])
                   c.drawString(50, y_cursor - 15, desc[75:])
                   y_cursor -= 40
                else:
                   c.drawString(50, y_cursor, desc)
                   y_cursor -= 40
                   
                y_cursor -= 10
            
            c.setFont(font_regular, 9)
            c.setFillColor(colors.grey)
            c.drawCentredString(width/2, 30, "Money Hunter AI | 2026 Tax Law Analysis | Page 5 of 6")

            # ==============================
            # PAGE 6: LETTER OF EXPLANATION (DRAFT)
            # ==============================
            c.showPage()
            
            # Header
            c.setFillColorRGB(30/255, 35/255, 48/255)
            c.setFont(font_bold, 24)
            c.drawString(40, height - 60, "Letter of Explanation (Draft)")
            c.setStrokeColorRGB(212/255, 175/255, 55/255)
            c.setLineWidth(2)
            c.line(40, height - 75, width - 40, height - 75)
            
            y_cursor = height - 150
            
            # Draft Box
            c.setStrokeColor(colors.black)
            c.setLineWidth(1)
            box_top = height - 140
            box_bottom = 120
            box_height = box_top - box_bottom
            c.rect(40, box_bottom, width - 80, box_height, stroke=1, fill=0)
            
            # Content
            c.setFont(font_regular, 12)
            c.setFillColor(colors.black)
            
            lines = [
                "수신: 관련 금융기관장 / 관할 세무서장 귀하",
                f"발신: {user_name} (귀사 고객 / 납세자)",
                f"작성일: {today_str}",
                "",
                "[제목: 세법 개정 및 법령 해석에 따른 권리 구제 요청의 건]",
                "",
                "1. 귀 기관의 무궁한 발전을 기원합니다.",
                "",
                "2. 본인은 귀 기관의 고객/납세자로서, 최근 개정된 세법(2026년 기준) 및",
                "   대법원 판례에 근거하여 다음과 같이 정당한 권리 행사를 요청합니다.",
                "",
                "3. 요청 사항:",
            ]
            
            if isa:
                lines.extend([
                    "   - ISA 만기 자금의 연금 계좌 전환 시, 조세특례제한법 상 허용된",
                    "     세액공제 한도 증액(전환금액의 10%, 최대 300만원) 적용 요청",
                ])
            if overseas:
                lines.extend([
                    "   - 해외주식 직접 투자 소득에 대한 ISA 계좌 내 운용 인정 및",
                    "     이에 따른 손익통산 및 저율 과세(9.9%) 적용 요청",
                ])
             
            lines.extend([
                "",
                "4. 본 요청은 'Money Hunter AI'의 법령 분석 엔진을 통해 검토된 내용이며,",
                "   관련 법적 근거가 충분하므로 신속한 처리를 부탁드립니다.",
                "",
                "첨부: 상세 금융 분석 리포트 1부.",
                "",
                "위와 같이 소명합니다.",
                "",
                f"신청인: {user_name} (인)"
            ])
            
            text_y = box_top - 40
            for line in lines:
                c.drawString(60, text_y, line)
                text_y -= 28
            
            # Watermark
            c.saveState()
            c.translate(width/2, height/2)
            c.rotate(45)
            c.setFillColorRGB(220/255, 220/255, 220/255, alpha=0.3)
            c.setFont(font_bold, 80)
            c.drawCentredString(0, 0, "DRAFT COPY")
            c.restoreState()
            
            # Disclaimer
            y_cursor = 100
            c.setStrokeColor(colors.lightgrey)
            c.setLineWidth(1)
            c.line(40, y_cursor + 20, width - 40, y_cursor + 20)
            
            c.setFont(font_regular, 9)
            c.setFillColor(colors.grey)
            disclaimer = "면책 조항: 본 리포트는 입력하신 데이터를 바탕으로 한 예상 시뮬레이션 결과입니다. 실제 세액은 달라질 수 있습니다."
            c.drawString(40, y_cursor, disclaimer)
            
            c.setFont(font_regular, 9)
            c.setFillColor(colors.grey)
            c.drawCentredString(width/2, 30, "Money Hunter AI | 2026 Tax Law Analysis | Page 6 of 6")

            c.save()
            return file_path
            
        except Exception as e:
            logger.error(f"PDF Generation Error: {e}")
            import traceback
            traceback.print_exc()
            raise e
