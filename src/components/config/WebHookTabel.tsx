// src\components\config\WebHookTabel.tsx
import React, { useEffect, useState } from "react";
import type { webHookType } from "../../types/webHook"
import { getOrders } from '../../services/api'

const WebhookTabel = () => {
    const [configs, setConfigs] = useState<webHookType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState<number>(5);


    const configArray = configs.slice(0, limit);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOrders();
                setConfigs(data);
            } catch (err: any) {
                setError(err.message || "Terjadi kesalahan saat mengambil data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="flex flex-col">
            <div className="flex justify-end mb-2">
                <label className="mr-2 text-sm text-gray-600">Tampilkan:</label>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="border rounded px-2 py-1 text-sm"
                >
                    {[5, 10, 20, 50].map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light text-surface ">
                            <thead className="border-b border-neutral-200 bg-[#332D2D] font-medium text-white ">
                                <tr>

                                    <th className="px-6 py-4">Symbol</th>
                                    <th className="px-6 py-4">Timeframe</th>
                                    <th className="px-6 py-4">action</th>
                                    <th className="px-6 py-4">price_entry</th>
                                    <th className="px-6 py-4">tp_price</th>
                                    <th className="px-6 py-4">sl_price</th>
                                    <th className="px-6 py-4">Leverage</th>

                                </tr>
                            </thead>
                            <tbody>
                                {configArray.map((item, index) => (
                                    <tr key={index} className="border-b border-neutral-200">

                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{item.symbol}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.timeframe}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.action}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.price_entry}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.tp_price}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.tp_price}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.leverage}</td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        {loading && <p className="text-gray-500 mt-4 text-center">Memuat data...</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebhookTabel