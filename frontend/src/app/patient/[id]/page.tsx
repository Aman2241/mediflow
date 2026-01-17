'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Client } from '@stomp/stompjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { startMonitoring, analyzePatient, fetchPatient } from '@/lib/api';

export default function PatientDetail() {
    const { id } = useParams();
    const [vitals, setVitals] = useState<any>(null);
    const [patient, setPatient] = useState<any>(null);
    const [chatLog, setChatLog] = useState<{ role: string, content: string }[]>([]);
    const [query, setQuery] = useState('');
    const [connected, setConnected] = useState(false);

    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (id) {
            fetchPatient(id as string).then(setPatient);
            // Start monitoring on backend
            startMonitoring(Number(id));
        }

        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws-vitals',
            onConnect: () => {
                setConnected(true);
                client.subscribe(`/topic/vitals/${id}`, (message) => {
                    const data = JSON.parse(message.body);
                    setVitals(data);
                });
            },
            onDisconnect: () => {
                setConnected(false);
            }
        });

        client.activate();
        stompClientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [id]);

    const handleSendQuery = async () => {
        if (!query) return;
        const userMsg = { role: 'user', content: query };
        setChatLog([...chatLog, userMsg]);
        setQuery('');

        try {
            const res = await analyzePatient(Number(id), userMsg.content);
            setChatLog(prev => [...prev, { role: 'ai', content: res.response }]);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Vitals */}
            <div className="space-y-6">
                <Card className="dark:bg-zinc-950 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Patient Monitor: {patient?.name}</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-sm text-gray-500">{connected ? 'Live Stream Active' : 'Connecting...'}</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {vitals ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-center">
                                    <p className="text-gray-500 text-sm">Heart Rate</p>
                                    <p className="text-4xl font-mono font-bold text-rose-500 flex items-center justify-center gap-2">
                                        {vitals.heartRate} <span className="text-sm">BPM</span>
                                    </p>
                                </div>
                                <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-center">
                                    <p className="text-gray-500 text-sm">Blood Pressure</p>
                                    <p className="text-4xl font-mono font-bold text-blue-500">
                                        {vitals.systolic}/{vitals.diastolic}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    {/* Placeholder for Sparkline Chart */}
                                    <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                                        Real-time Chart (Placeholder)
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-400">Waiting for vitals...</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: AI Chat */}
            <div className="space-y-6 flex flex-col h-[calc(100vh-4rem)]">
                <Card className="flex-1 flex flex-col dark:bg-zinc-950 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            MediFlow AI Assistant
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border">
                            {chatLog.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {chatLog.length === 0 && (
                                <p className="text-center text-gray-400 text-sm mt-10">
                                    Ask me about {patient?.name}'s current condition or medical history.
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 bg-transparent border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type medical query..."
                                onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                            />
                            <Button onClick={handleSendQuery}>Send</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
