// src\components\layout\Sidebar.tsx
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white h-screen p-5 flex flex-col shrink-0">
            <div className="text-2xl font-bold mb-10">Dashboard</div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }: { isActive: boolean }) =>
                                `block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isActive ? 'bg-white text-gray-900' : 'text-white hover:bg-gray-700'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/list-data"
                            className={({ isActive }: { isActive: boolean }) =>
                                `block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isActive ? 'bg-white text-gray-900' : 'text-white hover:bg-gray-700'
                                }`
                            }
                        >
                            WebHook
                        </NavLink>

                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
