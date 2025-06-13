// src\components\config\OrdersTable.tsx
import React, { useEffect, useState } from "react";


export interface TradingConfig {
  id: number;
  symbol: string;
  timeframe: string;
  plusDI: number;
  minusDI: number;
  adx: number;
  takeProfit: number;
  stopLoss: number;
  leverage: string;
  createdAt?: string;
}


interface OrdersTableProps {
  data: TradingConfig | TradingConfig[] | null;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  const [configs, setConfigs] = useState<TradingConfig[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(5);

  const BASE_URL = "http://localhost:5000/api";

  async function getConfig(): Promise<TradingConfig[] | TradingConfig> {
    const response = await fetch(`${BASE_URL}/config`);
    if (!response.ok) {
      throw new Error("Gagal fetch config dari server");
    }
    const json = await response.json();
    return json.config || json.configs;
  }


  useEffect(() => {
    getConfig()
      .then((dataFromApi) => {
        const raw = Array.isArray(dataFromApi) ? dataFromApi : [dataFromApi];

        const mappedConfigs: TradingConfig[] = raw.map((item: any) => ({
          id: item.id,
          symbol: item.symbol,
          timeframe: item.timeframe,
          plusDI: item.plusDI,
          minusDI: item.minusDI,
          adx: item.adx,
          takeProfit: item.takeProfit,
          stopLoss: item.stopLoss,
          leverage: item.leverage,
          createdAt: item.createdAt,
        }));

        setConfigs(mappedConfigs);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal memuat konfigurasi:", error.message);
        setError("Gagal memuat konfigurasi. Silakan coba lagi.");
        setLoading(false);
      });
  }, []);


  const configArray = configs.slice(0, limit);
  // console.log('ini data', configArray)

  if (loading) {
    return <p className="text-center text-gray-500">Memuat konfigurasi...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (configs.length === 0) {
    return <p className="text-center text-gray-500">Tidak ada data konfigurasi tersedia.</p>;
  }


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
                  <th scope="col" className="px-6 py-4">Symbol</th>
                  <th scope="col" className="px-6 py-4">Timeframe</th>
                  <th scope="col" className="px-6 py-4">+DI</th>
                  <th scope="col" className="px-6 py-4">-DI</th>
                  <th scope="col" className="px-6 py-4">ADX</th>
                  <th scope="col" className="px-6 py-4">Take Profit (%)</th>
                  <th scope="col" className="px-6 py-4">Stop Loss (%)</th>
                  <th scope="col" className="px-6 py-4">Leverage</th>
                </tr>
              </thead>
              <tbody>
                {configArray.map((item, index) => (
                  <tr key={index} className="border-b border-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{item.symbol}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.timeframe}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.plusDI}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.minusDI}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.adx}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.takeProfit}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.stopLoss}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.leverage}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;