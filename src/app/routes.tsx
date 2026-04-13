import { createBrowserRouter, Navigate } from "react-router";
import { RootShell } from "./components/RootShell";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Benefits } from "./pages/Benefits";
import { Progress } from "./pages/Progress";
import { Community } from "./pages/Community";
import { Notifications } from "./pages/Notifications";
import { VisitAssistant } from "./pages/VisitAssistant";
import { InteractiveMap } from "./pages/InteractiveMap";
import { EventDetail } from "./pages/EventDetail";
import { Livestream } from "./pages/Livestream";
import { LivestreamSummary } from "./pages/LivestreamSummary";
import { NotificationScreen } from "./pages/NotificationScreen";

export const router = createBrowserRouter([
  {
    element: <RootShell />,
    children: [
      { index: true, element: <Navigate to="/app" replace /> },
      { path: "notification", Component: NotificationScreen },
      {
        path: "app",
        Component: Layout,
        children: [
          { index: true, Component: Home },
          { path: "benefits", Component: Benefits },
          { path: "visit", Component: VisitAssistant },
          { path: "map", Component: InteractiveMap },
          { path: "visit-assistant", Component: VisitAssistant },
          { path: "progress", Component: Progress },
          { path: "community", Component: Community },
          { path: "notifications", Component: Notifications },
          { path: "events/:eventId", Component: EventDetail },
          { path: "livestream/:streamId/summary", Component: LivestreamSummary },
        ],
      },
      { path: "livestream/:streamId", Component: Livestream },
    ],
  },
]);
