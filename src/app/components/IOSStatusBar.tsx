/**
 * iOS-style status bar with time, cellular, wifi, and battery indicators.
 * Uses black icons by default (for light app backgrounds).
 * Pass `variant="light"` for white icons on dark backgrounds.
 */
export function IOSStatusBar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const color = variant === "light" ? "text-white" : "text-black";
  const fill = variant === "light" ? "white" : "black";
  const bg = variant === "light" ? "bg-white" : "bg-black";
  const border = variant === "light" ? "border-white" : "border-black";

  return (
    <div className={`flex items-center justify-between px-[36px] py-2 ${color}`}>
      <span className="text-[15px] font-semibold tracking-tight leading-none">9:41</span>

      <div className="flex items-center gap-[6px]">
        {/* Cellular */}
        <div className="flex items-end gap-[2px]">
          <div className={`w-[3px] h-[4px] ${bg} rounded-full`} />
          <div className={`w-[3px] h-[6px] ${bg} rounded-full`} />
          <div className={`w-[3px] h-[8px] ${bg} rounded-full`} />
          <div className={`w-[3px] h-[10px] ${bg} rounded-full`} />
        </div>

        {/* WiFi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill={fill} className="mt-0.5">
          <path d="M7.5 3.5C9.5 3.5 11.3 4.3 12.6 5.5L14 4C12.2 2.3 9.9 1.2 7.5 1.2C5.1 1.2 2.8 2.3 1 4L2.4 5.5C3.7 4.3 5.5 3.5 7.5 3.5Z" />
        </svg>

        {/* Battery */}
        <div className="flex items-center gap-[2px]">
          <div className={`w-[22px] h-[11px] border-2 ${border} rounded-[3px] relative`}>
            <div className={`absolute inset-[2px] ${bg} rounded-[1px]`} />
          </div>
          <div className={`w-[2px] h-[4px] ${bg} rounded-r-sm`} />
        </div>
      </div>
    </div>
  );
}
