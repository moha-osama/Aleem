import { Navigate, Outlet, useLocation } from "react-router-dom";
import { tokenStorage } from "@/api/client";
import { useAuth } from "./useAuth";
import FullPageLoader from "@/components/ui/FullPageLoader";

export function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const hasToken = Boolean(tokenStorage.getAccessToken());

  if (isCheckingAuth && hasToken) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <FullPageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
