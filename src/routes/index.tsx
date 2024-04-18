import Header from "@/components/header";
import CoursePage from "@/pages/course";

import HomeScreen from "@/pages/home";

import SettingsPage from "@/pages/settings";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import CoursesPage from "@/pages/courses";
import Footer from "@/components/footer";

type Props = {};

export default function Router({}: Props) {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Header />
        <Toaster
          position="bottom-right"
          richColors
          expand={false}
          visibleToasts={1}
        />
      </ThemeProvider>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/receitas/:courseId" element={<CoursePage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="/receitas" element={<CoursesPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
