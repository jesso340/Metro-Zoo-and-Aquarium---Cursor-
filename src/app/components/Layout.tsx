import { Outlet, Link, useLocation } from "react-router";
import { Home, Gift, TrendingUp, BarChart3, Users, Bell, MapPin, Footprints } from "lucide-react";
import { notifications } from "../data/mockData";
import { ZooAssistant } from "./ZooAssistant";
import { useEffect, type CSSProperties } from "react";

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
    { path: "/app/progress", icon: TrendingUp, label: "Your Impact" },
    { path: "/app/community", icon: Users, label: "Community" },
    { path: "/app/notifications", icon: Bell, label: "Notifications", badge: unreadCount },
  ];

  return (
    <div
      className="min-h-dvh w-full max-w-[var(--metro-shell-max-width)] mx-auto bg-neutral-50 shadow-2xl relative overflow-x-hidden"
      style={
        {
          ["--metro-shell-max-width" as string]: "393px",
          ["--metro-header-extra-top" as string]: "0px",
        } as CSSProperties
      }
    >
      <header className="sticky top-0 z-50 flex flex-col bg-white shadow-sm">
        <div className="metro-header-safe-top shrink-0" aria-hidden />
        <div className="w-full py-[10px] pl-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shadow-md shrink-0">
                <Footprints className="text-white" size={20} />
              </div>
              <div className="min-w-0">
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
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs flex items-center justify-center rounded-full">
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
                  <span className="absolute top-0 right-0 w-5 h-5 bg-green-600 text-white text-xs flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full py-6 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] overflow-y-auto pb-[calc(6.75rem+max(env(safe-area-inset-bottom,0px),var(--metro-safe-area-fallback-min-bottom,20px)))]">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[var(--metro-shell-max-width)] bg-white border-t border-neutral-200 pb-0 shadow-lg z-50">
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
                  <span className="absolute top-2 right-1/4 w-4 h-4 bg-green-600 text-white text-xs flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        {/* Home indicator row + visible bottom safe-area strip (env is 0 on desktop — min height still shows) */}
        <div className="metro-bottom-safe flex flex-col bg-slate-200/90">
          <div className="h-5 flex justify-center items-center pt-1">
            <div className="w-32 h-1 bg-neutral-400/80 rounded-full" />
          </div>
          <div
            className="metro-bottom-safe-inset w-full shrink-0 border-t border-slate-300/80"
            aria-hidden
            title="Bottom safe area (home indicator). Grows on a real iPhone."
          />
        </div>
      </nav>

      {/* Zoo Assistant */}
      <div className="fixed z-50 right-[calc(50%-var(--metro-shell-max-width)/2+1.5rem)] bottom-[calc(5.75rem+max(env(safe-area-inset-bottom,0px),var(--metro-safe-area-fallback-min-bottom,20px)))]">
        <ZooAssistant />
      </div>
    </div>
  );
}