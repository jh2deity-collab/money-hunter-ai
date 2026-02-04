from reportlab.pdfgen import canvas
import sys

try:
    c = canvas.Canvas("test_gen.pdf")
    c.drawString(100, 750, "Hello World")
    c.save()
    print("PDF Generated Successfully")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
