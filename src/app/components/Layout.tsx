import { Outlet, Link, useLocation } from "react-router";
import { Home, Gift, TrendingUp, BarChart3, Users, Bell, Leaf, MapPin, Footprints } from "lucide-react";
import { notifications } from "../data/mockData";
import { ZooAssistant } from "./ZooAssistant";
import { useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/benefits", icon: Gift, label: "Benefits" },
    { path: "/app/visit", icon: MapPin, label: "Visit" },
    { path: "/app/progress", icon: TrendingUp, label: "Progress" },
    { path: "/app/community", icon: Users, label: "Community" },
    { path: "/app/notifications", icon: Bell, label: "Notifications", badge: unreadCount },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 max-w-[430px] mx-auto border-x border-neutral-200 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="w-full px-[16px] py-[10px]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shadow-md">
                <Footprints className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-800 leading-snug">Metro Zoo and Aquarium</h1>
              </div>
            </div>
            
            {/* Desktop Navigation (Hidden in mobile view) */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors relative ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              {/* Desktop Zoo Assistant button */}
              <div className="ml-2">
                <ZooAssistant />
              </div>
            </nav>

            {/* Mobile Notification Icon */}
            <div className="flex items-center">
              <Link to="/app/notifications" className="relative p-2">
                <Bell size={24} className="text-neutral-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-6 overflow-y-auto pb-24">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-neutral-200 pb-safe shadow-lg z-50">
        <div className="flex items-center justify-around h-16">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                  isActive ? "text-green-700" : "text-neutral-600"
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] mt-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute top-2 right-1/4 w-4 h-4 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        {/* iOS Home Indicator Spacer */}
        <div className="h-5 flex justify-center items-center pb-2">
          <div className="w-32 h-1 bg-neutral-200 rounded-full" />
        </div>
      </nav>

      {/* Zoo Assistant */}
      <div className="fixed bottom-24 right-[calc(50%-215px+1.5rem)] z-50">
        <ZooAssistant />
      </div>
    </div>
  );
}