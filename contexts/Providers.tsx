"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
  themeBalham,
} from "ag-grid-community";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  ModuleRegistry.registerModules([AllCommunityModule]);

  provideGlobalGridOptions({
    theme: themeBalham,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
