// src\components\config\WebHookForm.tsx
// src/components/config/WebHookForm.tsx
import React, { useState } from "react";
import type { webHookType } from "../../types/webHook";
import { sendWebhookSignal } from "../../services/api";

type Props = {
    defaultConfig?: webHookType | null;
    onSave: (result: any) => void;
};

const WebHookForm: React.FC<Props> = ({ onSave, defaultConfig }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        symbol: defaultConfig?.symbol || "BTCUSDT",
        timeframe: defaultConfig?.timeframe || "5m",
        plusDI: String(defaultConfig?.plusDI ?? "27.5"),
        minusDI: String(defaultConfig?.minusDI ?? "15.0"),
        adx: String(defaultConfig?.adx ?? "25.0"),
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const numberFields = ["plusDI", "minusDI", "adx"];

        numberFields.forEach((field) => {
            const value = parseFloat(form[field as keyof typeof form]);
            if (isNaN(value) || value <= 0) {
                newErrors[field] = "Harus berupa angka lebih besar dari 0";
            }
        });

        if (!form.symbol.trim()) {
            newErrors.symbol = "Simbol tidak boleh kosong";
        }

        if (!form.timeframe.trim()) {
            newErrors.timeframe = "Timeframe wajib dipilih";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload: webHookType = {
            symbol: form.symbol.trim(),
            timeframe: form.timeframe,
            plusDI: parseFloat(form.plusDI),
            minusDI: parseFloat(form.minusDI),
            adx: parseFloat(form.adx),
        };


        try {
            const result = await sendWebhookSignal(payload);
            onSave(result);
            alert("Konfigurasi berhasil disimpan!");
        } catch (error: any) {
            console.error("Gagal menyimpan konfigurasi:", error.message);
            alert("Gagal menyimpan konfigurasi: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SYMBOL */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Simbol Trading <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="symbol"
                        value={form.symbol}
                        onChange={handleChange}
                        placeholder="Contoh: BTCUSDT, ETHUSDT"
                        className={`bg-gray-50 border ${errors.symbol ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    />
                    {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
                </div>

                {/* TIMEFRAME */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Timeframe <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="timeframe"
                        value={form.timeframe}
                        onChange={handleChange}
                        className={`bg-gray-50 border ${errors.timeframe ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
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

                {/* PLUS DI */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        plusDI <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="plusDI"
                        value={form.plusDI}
                        onChange={handleChange}
                        className={`bg-gray-50 border ${errors.plusDI ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    />
                    {errors.plusDI && <p className="text-red-500 text-xs mt-1">{errors.plusDI}</p>}
                </div>

                {/* MINUS DI */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        minusDI <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="minusDI"
                        value={form.minusDI}
                        onChange={handleChange}
                        className={`bg-gray-50 border ${errors.minusDI ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    />
                    {errors.minusDI && <p className="text-red-500 text-xs mt-1">{errors.minusDI}</p>}
                </div>

                {/* ADX */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        adx <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="adx"
                        value={form.adx}
                        onChange={handleChange}
                        className={`bg-gray-50 border ${errors.adx ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    />
                    {errors.adx && <p className="text-red-500 text-xs mt-1">{errors.adx}</p>}
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
        </form>
    );
};

export default WebHookForm;
