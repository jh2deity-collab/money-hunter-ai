import sys
import os

# Add project root to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    print("1. Importing PDFService...")
    from app.services.pdf_service import PDFService
    print("   Success.")
except ImportError as e:
    print(f"   Failed to import PDFService: {e}")
    sys.exit(1)
except Exception as e:
    print(f"   Error during import: {e}")
    sys.exit(1)

try:
    print("2. Generating Dummy Report...")
    dummy_data = {
        "isa": {"total_estimated_benefit": 1000000, "recommendation": "Test Rec"},
        "overseas": {"saved_amount": 50000, "tax_normal_account": 100000, "tax_isa_account": 50000},
        "answers": {"userInfo": {"name": "Tester"}, "insurance": "yes"}
    }
    
    path = PDFService.generate_report(dummy_data)
    print(f"   Success. PDF generated at: {path}")
    
except Exception as e:
    print(f"   Failed to generate report.")
    print(f"   Error Type: {type(e).__name__}")
    print(f"   Error Message: {e}")
    import traceback
    traceback.print_exc()
