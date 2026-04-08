import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Prototype shortcuts (ignored while typing in form fields):
 * - **R** → iOS home screen
 * - **P** → Notifications, scrolled to baby penguin livestream item
 */
function ShellHotkeys() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const k = e.key;
      if (k === "r" || k === "R") {
        e.preventDefault();
        navigate("/ios-home");
        return;
      }
      if (k === "p" || k === "P") {
        e.preventDefault();
        navigate("/app/notifications#penguin-livestream");
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

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
