import { create } from "zustand";

interface Store {
  apiUrl: string;
  setApiUrl: (url: string) => void;
  resetApiUrl: () => void;
}

const useApiUrl = create<Store>((set) => ({
  apiUrl: "http://localhost:5000",
  setApiUrl: (url) => {
    localStorage.setItem("apiUrl", url);
    set({ apiUrl: url });
  },
  resetApiUrl: () => {
    localStorage.setItem("apiUrl", "http://localhost:5000");
    set({ apiUrl: "http://localhost:5000" });
  },
}));

export default useApiUrl;
