import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";

// Centralized HTTP client ensures auth/error behavior is consistent for every feature module.
export const ACCESS_TOKEN_STORAGE_KEY = "access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";

export interface ApiErrorPayload {
  detail?: string;
  [key: string]: unknown;
}

export class ApiClientError extends Error {
  readonly status?: number;
  readonly payload?: ApiErrorPayload;

  constructor(message: string, status?: number, payload?: ApiErrorPayload) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.payload = payload;
  }
}

export const tokenStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  },
  setTokens(tokens: { access: string; refresh: string }) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokens.refresh);
  },
  setAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  },
  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  },
};

const baseURL = (import.meta.env.VITE_API_URL as string | undefined)?.trim();

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const refreshClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefreshToken();

  if (!refresh) {
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<{ access: string }>("/api/auth/token/refresh/", { refresh })
      .then((response) => {
        tokenStorage.setAccessToken(response.data.access);
        return response.data.access;
      })
      .catch(() => {
        tokenStorage.clearTokens();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function redirectToLogin() {
  if (typeof window === "undefined") {
    return;
  }

  const isAuthRoute =
    window.location.pathname === "/login" ||
    window.location.pathname.startsWith("/signup");

  if (!isAuthRoute) {
    window.location.replace("/login");
  }
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();

  if (accessToken) {
    const headers = new AxiosHeaders(config.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    config.headers = headers;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorPayload>) => {
    const isNetworkError = !error.response;
    const status = error.response?.status;
    const payload = error.response?.data;
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/login/") &&
      !originalRequest.url?.includes("/api/auth/token/refresh/")
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
      }

      const newAccessToken = await refreshAccessToken();
      isRefreshing = false;

      if (newAccessToken) {
        const headers = new AxiosHeaders(originalRequest.headers);
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        originalRequest.headers = headers;
        return apiClient(originalRequest);
      }
    }

    const message =
      payload?.detail ??
      error.message ??
      (isNetworkError ? "Network error" : "Unexpected API error");

    if (status === 401) {
      tokenStorage.clearTokens();
      redirectToLogin();
    }

    return Promise.reject(new ApiClientError(message, status, payload));
  },
);
