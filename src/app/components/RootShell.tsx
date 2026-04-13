import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Prototype shortcuts (ignored while typing in form fields):
 * - **R** → demo in device bezel (`/demo`)
 * - **P** → lock screen (`/notification`) showing the baby penguin livestream banner only
 *
 * When running inside the bezel iframe, shortcuts navigate the *parent* window
 * so the bezel stays visible.
 */
function ShellHotkeys() {
  const navigate = useNavigate();
  const isInsideIframe = window !== window.top;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const k = e.key;
      if (k === "r" || k === "R") {
        e.preventDefault();
        if (isInsideIframe) {
          navigate("/ios-home");
        } else {
          navigate("/demo");
        }
        return;
      }
      if (k === "p" || k === "P") {
        e.preventDefault();
        if (isInsideIframe) {
          try { window.top!.location.href = "/notification"; } catch { /* cross-origin */ }
        } else {
          navigate("/notification", {
            state: { showSecondNotificationOnly: true },
          });
        }
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, isInsideIframe]);

  return null;
}

export function RootShell() {
  return (
    <>
      <ShellHotkeys />
      <Outlet />
    </>
  );
}
