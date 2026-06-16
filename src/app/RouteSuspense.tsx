import { Suspense, type ReactNode } from "react";

interface RouteSuspenseProps {
  children: ReactNode;
}

export const RouteSuspense = ({ children }: RouteSuspenseProps) => (
  <Suspense fallback={null}>{children}</Suspense>
);
