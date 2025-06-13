// src\pages\Dashboard.tsx

import { useEffect, useState } from "react";
import TradingForm from "../components/config/TradingForm";
import { getConfig } from "../services/api";
import type { TradingConfig } from "../types/trading";
import ConfigTable from "../components/config/OrdersTable";


const Dashboard = () => {
    const [config, setConfig] = useState<TradingConfig | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        getConfig()
            .then((data) => {
                setConfig(data);
                setError(null);
            })
            .catch((error) => {
                console.error("Gagal memuat konfigurasi:", error.message);
                setError("Gagal memuat konfigurasi. Silakan coba lagi.");
            });
    }, []);

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }
    if (!config) {
        return <p className="text-center text-gray-500 mt-10">Memuat konfigurasi...</p>;
    }

    // if (!config) return <p className="text-center mt-10">Memuat konfigurasi...</p>;

    return (
        <div className="min-h-screen p-6 bg-amber-200 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="ms-1 font-bold text-2xl">From Simualsi</h2>
                    <div className="mt-3">
                        <TradingForm defaultConfig={config} onSave={setConfig} />
                    </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="ms-1 font-bold text-2xl">Hasil Simualsi</h2>
                    <div className="mt-3">
                        <ConfigTable data={null} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
