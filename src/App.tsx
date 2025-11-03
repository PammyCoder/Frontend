import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Browse from "./pages/Browse";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ImageDetail from "./pages/ImageDetail";
import NotFound from "./pages/NotFound";

import EbookDetail from "./pages/EbookDetail";
import Categories from "./components/Categories";
import Pricing from "./components/Pricing";

import { Navigate} from "react-router-dom";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
       <Route path="/categories" element={<Categories />} />
        <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
           <Route
    path="/admin"
    element={
      localStorage.getItem("isAdmin") ? <Admin /> : <Navigate to="/auth" />
    }
  />
          <Route path="/image/:id" element={<ImageDetail />} />
                  <Route path="/ebook/:id" element={<EbookDetail />} />
                     
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
