// src\pages\Webhook.tsx

import React from 'react';
import WebHookForm from "../components/config/WebHookForm"
import WebHookTabel from "../components/config/WebHookTabel"

const Webhook: React.FC = () => {

    return (
        <div className="min-h-screen p-6 bg-amber-200 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="ms-1 font-bold text-2xl">From Webhook</h2>
                    <div className="mt-3">
                        <WebHookForm onSave={(result) => console.log("Webhook disimpan:", result)} />

                    </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="ms-1 font-bold text-2xl">Hasil Webhook</h2>
                    <div className="mt-3">
                        <WebHookTabel />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Webhook;