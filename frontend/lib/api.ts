const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface ISASimulationRequest {
    current_amount: number;
    years_maintained: number;
    conversion_amount: number;
}

export interface OverseasTaxRequest {
    investment_amount: number;
    profit_rate: number;
}

export async function simulateISACycle(data: ISASimulationRequest) {
    try {
        const response = await fetch(`${API_BASE_URL}/analysis/isa-cycle`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("ISA simulation failed");
        return response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

export async function simulateOverseasTax(data: OverseasTaxRequest) {
    try {
        const response = await fetch(`${API_BASE_URL}/analysis/overseas-tax`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Tax simulation failed");
        return response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

export async function downloadReport(data: any) {
    try {
        const response = await fetch(`${API_BASE_URL}/analysis/report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Report generation failed");
        return response.blob();
    } catch (error) {
        throw error;
    }
}
