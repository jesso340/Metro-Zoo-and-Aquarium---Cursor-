import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Prototype shortcuts (ignored while typing in form fields):
 * - **R** → iOS home screen (inside bezel)
 * - **P** → lock screen / notification (inside bezel)
 *
 * Inside the bezel iframe: navigate within the iframe so the bezel stays.
 * At the top level: navigate to /demo?screen=... so the bezel wraps the target.
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
          navigate("/notification", {
            state: { showSecondNotificationOnly: true },
          });
        } else {
          navigate("/demo?screen=notification");
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
