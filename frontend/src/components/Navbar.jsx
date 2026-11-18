import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Moon, Sun, User as UserIcon, LogOut, Menu } from "lucide-react"
import { fetchUserProfile } from "../api/authApi"
import { useSocket } from "../hooks/useSocket"
import { useTheme } from "../context/ThemeContext"

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [userData, setUserData] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Real-time socket initialization based on user ID
  const socket = useSocket(userData?.id);

  useEffect(() => {
    // Socket initialization is handled by useSocket,
    // but you can add other real-time events here if needed.
  }, [socket]);

  // Listen for storage changes (in case token is set from login page in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        try {
          const data = await fetchUserProfile();
          setUserData(data);
        } catch (error) {
          console.error("Failed to load user profile in Navbar", error);
          if (error.response?.status === 401) {
            handleLogout();
          }
        }
      } else {
        setUserData(null);
      }
    };
    getUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    import("../hooks/useSocket").then(({ disconnectSocket }) => disconnectSocket());
    setToken(null);
    setUserData(null);
    setShowDropdown(false);
    navigate("/login");
  }




  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Safe fallback for user's First Name
  const userFirstName = userData?.name ? userData.name.split(' ')[0] : 'Coder';
  const seedUrl = userData?.name ? encodeURIComponent(userFirstName) : 'Coder';

  return (
    <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-[#0b0f1a]/80 py-4 px-3 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-white/5 transition-all duration-300 shadow-sm dark:shadow-none gap-3 sm:gap-4 flex-wrap">        

      {/* Hamburger Menu (Mobile Only) */}
      <button 
        onClick={onMenuClick}
        className="md:hidden text-gray-500 dark:text-gray-300 hover:text-[#625df5] p-2 hover:bg-[#625df5]/10 rounded-xl transition-colors"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative hidden md:block group">
        <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 transition-colors group-hover:text-[#625df5]" />
        <input
          type="text"
          placeholder="Search problems, sheets, or tutorials..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              navigate(`/problems?search=${encodeURIComponent(e.target.value.trim())}`);
            }
          }}
          className="w-full bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-gray-200 border border-transparent dark:border-white/5 rounded-full pl-12 pr-6 py-2.5 focus:outline-none focus:border-[#625df5] dark:focus:border-indigo-500/50 focus:ring-2 focus:ring-[#625df5]/30 transition-all text-sm group-hover:bg-gray-200 dark:group-hover:bg-white/10"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 sm:gap-4 sm:gap-6 md:gap-8 ml-auto">

        {/* Icons */}
        <div className="flex items-center gap-5 text-gray-500 dark:text-gray-400">
          <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-yellow-500/10" title="Toggle Theme">
            {theme === "dark" ? <Sun size={20} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" /> : <Moon size={20} />}
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>

        {/* User Auth Section */}
        {token ? (
          <div className="relative profile-dropdown-container">
            <div
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#625df5] dark:group-hover:text-indigo-400 transition-colors drop-shadow-sm">{userFirstName}</span>
                <span className="text-[10px] uppercase text-gray-500 tracking-wider"></span>
              </div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#625df5] to-[#45b7f1] p-[2px] cursor-pointer hover:scale-105 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] ring-2 ring-transparent group-hover:ring-[#625df5]/50">
                <div className="w-full h-full bg-white dark:bg-[#0b0f1a] rounded-full overflow-hidden flex flex-col justify-end items-center">
                  <img src={`${userData?.profileimage}`} alt="avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#121622] rounded-xl shadow-xl border border-gray-100 dark:border-[#1e2332] overflow-hidden py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-[#1e2332] sm:hidden">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{userData?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userData?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-100 dark:bg-[#1a1f2e] hover:text-[#625df5] dark:hover:text-white transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <UserIcon size={16} />
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-green transition-colors">Login</Link>
            <Link to="/register" className="text-sm font-semibold bg-[#625df5] hover:bg-[#524de3] text-white px-4 py-2 rounded-xl transition-colors shadow-md">Register</Link>
          </div>
        )}

      </div>

    </div>
  )
}

export default Navbar