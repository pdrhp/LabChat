import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import Routes from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App>
          <Routes />
        </App>
        <Toaster richColors/>
    </ThemeProvider>
);
