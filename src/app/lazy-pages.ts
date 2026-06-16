import { lazy } from "react";

export const LoginPage = lazy(() =>
  import("../pages/auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);

export const SignupPage = lazy(() =>
  import("../pages/auth/SignupPage").then((module) => ({
    default: module.SignupPage,
  })),
);

export const CategoriesPage = lazy(() =>
  import("../pages/categories/CategoriesPage").then((module) => ({
    default: module.CategoriesPage,
  })),
);

export const ComparePage = lazy(() =>
  import("../pages/compare/ComparePage").then((module) => ({
    default: module.ComparePage,
  })),
);

export const DashboardPage = lazy(() =>
  import("../pages/dashboard/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);

export const LandingPage = lazy(() =>
  import("../pages/landing/LandingPage").then((module) => ({
    default: module.LandingPage,
  })),
);

export const LedgerPage = lazy(() =>
  import("../pages/ledger/LedgerPage").then((module) => ({
    default: module.LedgerPage,
  })),
);

export const RecordsPage = lazy(() =>
  import("../pages/records/RecordsPage").then((module) => ({
    default: module.RecordsPage,
  })),
);

export const TrendsPage = lazy(() =>
  import("../pages/trends/TrendsPage").then((module) => ({
    default: module.TrendsPage,
  })),
);
