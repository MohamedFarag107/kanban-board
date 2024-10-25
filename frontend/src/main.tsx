import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
const queryClient = new QueryClient();

import "./index.css";
import { MemberProvider } from "./context/member.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <MemberProvider>
        <App />
      </MemberProvider>
    </QueryClientProvider>
  </StrictMode>
);
