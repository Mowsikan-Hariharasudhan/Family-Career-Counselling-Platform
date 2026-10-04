import React, { useState } from 'react';
import { Lock, User, ShieldCheck } from 'lucide-react';

interface StaffAuthGuardProps {
  children: React.ReactNode;
  portalName: string;
}

export const StaffAuthGuard: React.FC<StaffAuthGuardProps> = ({ children, portalName }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(`auth-${portalName}`) === 'true';
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId || !password) return;
    
    setIsLoggingIn(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsAuthenticated(true);
      localStorage.setItem(`auth-${portalName}`, 'true');
      setIsLoggingIn(false);
    }, 1200);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-[#1D2630] rounded-lg shadow-[5px_5px_0px_#1D2630] overflow-hidden">
        <div className="bg-[#123B63] text-white p-6 border-b-2 border-[#1D2630] text-center">
          <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-sky-400" />
          <h2 className="text-xl font-bold">Authorized Access Only</h2>
          <p className="text-xs text-sky-200 mt-1">{portalName} Login Gateway</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#123B63] mb-1">Government Staff ID</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-[#667085]" />
              <input 
                type="text" 
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="e.g. MSDE-TN-409" 
                className="w-full text-sm pl-9 pr-3.5 py-2.5 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9]"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-[#123B63] mb-1">Password / Secure Token</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#667085]" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..." 
                className="w-full text-sm pl-9 pr-3.5 py-2.5 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9]"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#18864B] hover:bg-[#0F5C30] text-white font-bold rounded border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? 'Authenticating...' : 'Authenticate & Proceed'}
          </button>
          
          <p className="text-[10px] text-center text-[#667085] mt-4 italic">
            This system is for the use of authorized MSDE personnel only.
          </p>
        </form>
      </div>
    </div>
  );
};
