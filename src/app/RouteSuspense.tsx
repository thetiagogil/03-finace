import { Suspense, type ReactNode } from "react";
import { RouteLoadingFallback } from "./RouteLoadingFallback";

interface RouteSuspenseProps {
  children: ReactNode;
}

export const RouteSuspense = ({ children }: RouteSuspenseProps) => (
  <Suspense fallback={<RouteLoadingFallback />}>{children}</Suspense>
);
