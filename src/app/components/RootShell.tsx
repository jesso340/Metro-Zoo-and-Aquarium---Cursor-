import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Press **R** anywhere (except when typing in inputs) to open the iOS home screen.
 */
function IosHomeHotkey() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "r" && e.key !== "R") return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      e.preventDefault();
      navigate("/ios-home");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  return null;
}

export function RootShell() {
  return (
    <>
      <IosHomeHotkey />
      <Outlet />
    </>
  );
}
