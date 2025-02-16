
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, LineChart, User } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/analysis', icon: BarChart2, label: 'Analysis' },
  { to: '/charts', icon: LineChart, label: 'Charts' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function Navigation() {
  return (
    <div className="flex space-x-4">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-green-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </NavLink>
      ))}
    </div>
  );2
}