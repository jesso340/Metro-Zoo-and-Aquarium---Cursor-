import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
