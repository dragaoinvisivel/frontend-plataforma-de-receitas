import { create } from "zustand";

const defaultUrl = "http://localhost:9823"

interface Store {
  apiUrl: string;
  setApiUrl: (url: string) => void;
  resetApiUrl: () => void;
}

const useApiUrl = create<Store>((set) => ({
  apiUrl: defaultUrl,
  setApiUrl: (url) => {
    localStorage.setItem("apiUrl", url);
    set({ apiUrl: url });
  },
  resetApiUrl: () => {
    localStorage.setItem("apiUrl", defaultUrl);
    set({ apiUrl: defaultUrl });
  },
}));

export default useApiUrl;
