'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchPatients } from '@/lib/api';

export default function Home() {
    const [patients, setPatients] = useState<any[]>([]);

    useEffect(() => {
        fetchPatients().then(setPatients).catch(console.error);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50 dark:bg-zinc-900">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-12">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    MediFlow&nbsp;
                    <code className="font-mono font-bold">Doctor's Console</code>
                </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-5xl">
                {patients.map((patient) => (
                    <Card key={patient.id} className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-zinc-950 dark:border-zinc-800">
                        <CardHeader>
                            <CardTitle>{patient.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">Age: {patient.age} | Gender: {patient.gender}</p>
                            <div className="mt-4 flex justify-end">
                                <Link href={`/patient/${patient.id}`}>
                                    <Button>Monitor & Analyze</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
