// src\components\layout\MainLayout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Header />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;