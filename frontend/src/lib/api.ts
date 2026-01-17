const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function fetchPatients() {
    const res = await fetch(`${API_BASE}/patients`);
    return res.json();
}

export async function fetchPatient(id: string) {
    const res = await fetch(`${API_BASE}/patients/${id}`);
    return res.json();
}

export async function startMonitoring(id: number) {
    await fetch(`${API_BASE}/vitals/monitor/${id}`, { method: 'POST' });
}

export async function analyzePatient(id: number, query: string) {
    const res = await fetch(`${API_BASE}/agent/analyze/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    });
    return res.json();
}
