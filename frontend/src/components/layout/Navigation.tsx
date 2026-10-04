// ============================================================
// Main Navigation Component — UX4G Navigation Standard
// ============================================================

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Compass,
  Scale,
  MessageSquare,
  UserCheck,
  BarChart3,
  Sparkles,
  Menu,
  X,
  FileText,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  highlight?: boolean;
  badge?: string;
}

export const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { to: '/', label: t('nav.home', 'Home'), icon: <Home className="w-4 h-4" /> },
    {
      to: '/onboarding',
      label: t('nav.onboarding', 'Family Profile'),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      to: '/counselling',
      label: t('nav.counselling', 'Counselling Workspace'),
      icon: <MessageSquare className="w-4 h-4" />,
      highlight: true,
    },
    {
      to: '/careers',
      label: t('nav.career', 'Career Explorer'),
      icon: <Compass className="w-4 h-4" />,
    },
    {
      to: '/compare',
      label: t('nav.comparison', 'Compare Trades'),
      icon: <Scale className="w-4 h-4" />,
    }
  ];

  return (
    <nav className="bg-[#EEF0F4] border-b-2 border-[#1D2630] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0B73B9] text-white border-[#1D2630] shadow-[2px_2px_0px_#1D2630]'
                      : 'text-[#123B63] border-transparent hover:bg-white/80 hover:border-[#D0D5DD]'
                  } ${item.highlight ? 'font-extrabold' : ''}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] uppercase font-mono font-bold bg-[#D9A441] text-[#101214] rounded border border-[#1D2630]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between w-full py-2">
            <span className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded border border-[#1D2630] bg-white text-[#123B63]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#D0D5DD] flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded text-sm font-semibold border ${
                    isActive
                      ? 'bg-[#0B73B9] text-white border-[#1D2630]'
                      : 'text-[#123B63] bg-white border-[#D0D5DD]'
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold bg-[#D9A441] text-[#101214] rounded">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
