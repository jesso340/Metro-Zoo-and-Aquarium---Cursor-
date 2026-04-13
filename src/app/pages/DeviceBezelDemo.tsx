import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router";

const BEZEL_IMG = "/images/iphone-14-bezel.png";

/** Supported iframe starting screens via `?screen=` query param. */
const SCREEN_MAP: Record<string, string> = {
  home: "/ios-home",
  notification: "/notification",
  app: "/app",
};
const DEFAULT_SCREEN = "/ios-home";

/** Full-page presentation: prototype embedded in the iPhone bezel PNG. */
export function DeviceBezelDemo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [searchParams] = useSearchParams();
  const screenKey = searchParams.get("screen") ?? "";
  const iframeSrc = SCREEN_MAP[screenKey] ?? DEFAULT_SCREEN;

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on("vite:afterUpdate", () => {
        iframeRef.current?.contentWindow?.location.reload();
      });
    }
  }, []);

  return (
    <div className="bezel-demo-page">
      <div className="bezel-frame">
        <div className="bezel-frame__screen">
          <iframe
            ref={iframeRef}
            className="bezel-frame__iframe"
            src={iframeSrc}
            title="Metro Zoo and Aquarium prototype"
          />
        </div>
        <img
          className="bezel-frame__img"
          src={BEZEL_IMG}
          alt=""
          width={457}
          height={911}
          draggable={false}
        />
      </div>
    </div>
  );
}
