import { useRef, useEffect } from "react";

const BEZEL_IMG = "/images/iphone-14-bezel.png";

/** Full-page presentation: prototype embedded in the iPhone bezel PNG (iframe → /ios-home). */
export function DeviceBezelDemo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
            src="/ios-home"
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
