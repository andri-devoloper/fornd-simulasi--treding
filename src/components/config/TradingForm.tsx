// src\components\config\TradingForm.tsx
import React, { useState } from "react";
import type { TradingConfig } from "../../types/trading"
import { saveConfig } from "../../services/api";

type Props = {
    defaultConfig: TradingConfig | null;
    onSave: (result: any) => void;
};

const TradingForm: React.FC<Props> = ({ onSave }) => {
    const [form, setForm] = useState({
        symbol: "BTCUSDT",
        timeframe: "5m",
        plusDIThreshold: "25",
        minusDIThreshold: "20",
        adxMinimum: "20",
        takeProfitPercent: "2",
        stopLossPercent: "1",
        leverage: "10",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Validate numbers
        const numberFields = [
            'plusDIThreshold', 'minusDIThreshold', 'adxMinimum',
            'takeProfitPercent', 'stopLossPercent', 'leverage'
        ];

        numberFields.forEach(field => {
            const value = parseFloat(form[field as keyof typeof form]);
            if (isNaN(value) || value <= 0) {
                newErrors[field] = 'Harus angka lebih besar dari 0';
            }
        });

        // Validate symbol
        if (!form.symbol.trim()) {
            newErrors.symbol = 'Simbol tidak boleh kosong';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload: TradingConfig = {

            symbol: form.symbol.trim(),
            timeframe: form.timeframe as TradingConfig["timeframe"],
            plusDIThreshold: parseFloat(form.plusDIThreshold),
            minusDIThreshold: parseFloat(form.minusDIThreshold),
            adxMinimum: parseFloat(form.adxMinimum),
            takeProfitPercent: parseFloat(form.takeProfitPercent),
            stopLossPercent: parseFloat(form.stopLossPercent),
            leverage: `${form.leverage}x`, // Tambahkan "x" untuk leverage
        };

        try {
            const result = await saveConfig(payload);
            onSave(result);
            alert("Konfigurasi berhasil disimpan!");

            console.log(payload)
        } catch (error: any) {
            console.error("Gagal menyimpan konfigurasi:", error.message);
            alert("Gagal menyimpan konfigurasi: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom 1 */}
                <div className="space-y-4">
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Simbol Trading <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="symbol"
                            value={form.symbol}
                            onChange={handleChange}
                            placeholder="Contoh: BTCUSDT, ETHUSDT"
                            className={`bg-gray-50 border ${errors.symbol ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        />
                        {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
                    </div>


                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Timeframe <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="timeframe"
                            value={form.timeframe}
                            onChange={handleChange}
                            className={`bg-gray-50 border ${errors.timeframe ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        >
                            <option value="">Pilih timeframe</option>
                            <option value="1m">1 Menit</option>
                            <option value="5m">5 Menit</option>
                            <option value="15m">15 Menit</option>
                            <option value="30m">30 Menit</option>
                            <option value="1h">1 Jam</option>
                            <option value="4h">4 Jam</option>
                            <option value="1d">1 Hari</option>
                        </select>
                        {errors.timeframe && <p className="text-red-500 text-xs mt-1">{errors.timeframe}</p>}
                    </div>


                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            +DI Threshold <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="plusDIThreshold"
                            value={form.plusDIThreshold}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Threshold untuk +DI"
                            className={`bg-gray-50 border ${errors.plusDIThreshold ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        />
                        {errors.plusDIThreshold && <p className="text-red-500 text-xs mt-1">{errors.plusDIThreshold}</p>}
                    </div>
                </div>

                {/* Kolom 2 */}
                <div className="space-y-4">
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            -DI Threshold <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="minusDIThreshold"
                            value={form.minusDIThreshold}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Threshold untuk -DI"
                            className={`bg-gray-50 border ${errors.minusDIThreshold ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        />
                        {errors.minusDIThreshold && <p className="text-red-500 text-xs mt-1">{errors.minusDIThreshold}</p>}
                    </div>


                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Minimum ADX <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="adxMinimum"
                            value={form.adxMinimum}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Nilai minimum ADX"
                            className={`bg-gray-50 border ${errors.adxMinimum ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        />
                        {errors.adxMinimum && <p className="text-red-500 text-xs mt-1">{errors.adxMinimum}</p>}
                    </div>

                </div>
            </div>

            {/* Pengaturan Risiko */}
            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pengaturan Risiko</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Take Profit (%) <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="takeProfitPercent"
                            value={form.takeProfitPercent}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Persentase profit"
                            className={`bg-gray-50 border ${errors.takeProfitPercent ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        />
                        {errors.takeProfitPercent && <p className="text-red-500 text-xs mt-1">{errors.takeProfitPercent}</p>}
                    </div>


                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Stop Loss (%) <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="stopLossPercent"
                            value={form.stopLossPercent}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Persentase stop loss"
                            className={`bg-gray-50 border ${errors.stopLossPercent ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        />
                        {errors.stopLossPercent && <p className="text-red-500 text-xs mt-1">{errors.stopLossPercent}</p>}
                    </div>


                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Leverage <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <input
                                name="leverage"
                                value={form.leverage}
                                onChange={handleChange}
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Leverage"
                                className={`bg-gray-50 border ${errors.leverage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                            />
                            <div className="bg-gray-200 px-3 py-2.5 border-t border-b border-r border-gray-300 rounded-r-lg">
                                x
                            </div>
                        </div>
                        {errors.leverage && <p className="text-red-500 text-xs mt-1">{errors.leverage}</p>}
                    </div>

                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
                >
                    Simpan
                </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                * Konfigurasi default akan digunakan jika tidak diubah
            </div>
        </form>
    );
};

export default TradingForm;