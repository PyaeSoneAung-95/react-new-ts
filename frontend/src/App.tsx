import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AuthProvider from "./providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NewsDetail from "./pages/NewsDetail";
import Category from "./pages/Category";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Private from "./pages/Private";
import MyNews from "./pages/MyNews";
import CreateNews from "./pages/CreateNews";
import Account from "./pages/Account";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer limit={1} />
      <BrowserRouter>
        <HelmetProvider>
          <AuthProvider>
            <Navbar />
            <main className="mt-16 p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news/:newsId" element={<NewsDetail />} />
                <Route path="/category/:name" element={<Category />} />
                <Route path="/account" element={<Private />}>
                  <Route index element={<Account />} />
                  <Route path="mynews" element={<MyNews />} />
                  <Route path="create_news" element={<CreateNews />} />
                </Route>
              </Routes>
            </main>
          </AuthProvider>
        </HelmetProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
