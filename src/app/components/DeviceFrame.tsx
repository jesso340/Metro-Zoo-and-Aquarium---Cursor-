import React, { Fragment, useEffect, useState, type ReactNode } from "react";
import { Smartphone, Maximize2 } from "lucide-react";

const FRAME_STORAGE_KEY = "metroZooDeviceFrame";

/** User explicitly chose on/off; if unset, we follow viewport width. */
function readInitialFrame(): boolean {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get("frame") === "1" || params.get("deviceFrame") === "1") return true;
  if (params.get("frame") === "0" || params.get("deviceFrame") === "0") return false;

  const stored = localStorage.getItem(FRAME_STORAGE_KEY);
  if (stored === "off") return false;
  if (stored === "on") return true;
  return window.matchMedia("(min-width: 900px)").matches;
}

/**
 * Desktop preview: wraps the app in a realistic iPhone mockup (screen area is live React).
 * Preference is saved only when you use the toggle buttons (visiting on a small screen no longer
 * permanently disables the frame on desktop).
 */
export function DeviceFrame({ children }: { children: ReactNode }) {
  const [showFrame, setShowFrame] = useState(readInitialFrame);
  const [wideScreen, setWideScreen] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => setWideScreen(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (showFrame) {
      document.body.dataset.deviceFrame = "1";
    } else {
      delete document.body.dataset.deviceFrame;
    }
    return () => {
      delete document.body.dataset.deviceFrame;
    };
  }, [showFrame]);

  const turnOffFrame = () => {
    localStorage.setItem(FRAME_STORAGE_KEY, "off");
    setShowFrame(false);
  };

  const turnOnFrame = () => {
    localStorage.setItem(FRAME_STORAGE_KEY, "on");
    setShowFrame(true);
  };

  if (!showFrame) {
    return (
      <Fragment>
        {children}
        {wideScreen && (
          <button
            type="button"
            onClick={turnOnFrame}
            className="fixed bottom-4 right-4 z-[200] flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-2 text-xs font-medium text-white shadow-lg hover:bg-neutral-800"
          >
            <Smartphone size={14} />
            Show iPhone frame
          </button>
        )}
      </Fragment>
    );
  }

  return (
    <div className="device-frame-chrome relative flex min-h-dvh w-full items-center justify-center bg-black p-2 sm:p-3">
      <button
        type="button"
        onClick={turnOffFrame}
        className="fixed right-3 top-3 z-[300] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md transition hover:bg-white/20"
        title="Full width (hide frame)"
        aria-label="Full width — hide iPhone frame"
      >
        <Maximize2 size={18} strokeWidth={2} />
      </button>

      <div className="relative mx-auto w-full max-w-[min(520px,96vw)]">
        <img
          src="/device-mockup/phone_035.jpg"
          alt=""
          className="relative z-0 block h-auto w-full select-none pointer-events-none"
          draggable={false}
        />

        <div
          className="absolute z-10 overflow-hidden bg-neutral-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
          style={{
            top: "11.4%",
            left: "27.05%",
            width: "45.9%",
            height: "77.8%",
            borderRadius: "clamp(1.75rem, 5vw, 2.65rem)",
          }}
        >
          {/* Decorative island sits behind the live app so header/safe-area padding stay visible */}
          <div
            className="pointer-events-none absolute left-1/2 top-2 z-10 h-[27px] w-[38%] max-w-[118px] -translate-x-1/2 rounded-full bg-black/40 shadow-md ring-1 ring-white/10"
            aria-hidden
          />

          <div className="device-frame-scroll relative z-20 h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
