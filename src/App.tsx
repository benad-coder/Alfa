import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppLayout } from "@/components/layout/app-layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import ProductDetail from "@/pages/product-detail";
import AdminInquiries from "@/pages/admin-inquiries";
import Cart from "@/pages/cart";
import { Link } from "wouter";
import { CartProvider } from "@/lib/cart-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppLayout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/contact" component={Contact} />
                <Route path="/cart" component={Cart} />
                <Route path="/product/:id" component={ProductDetail} />
                <Route path="/admin/inquiries" component={AdminInquiries} />
                <Route>
                  <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
                    <h1 className="font-serif text-6xl mb-6 text-foreground">404</h1>
                    <p className="text-muted-foreground text-lg uppercase tracking-widest mb-10">Page Not Found</p>
                    <Link href="/" className="inline-flex h-12 items-center justify-center bg-primary text-primary-foreground px-8 text-sm uppercase tracking-widest font-medium transition-all hover:bg-primary/90">
                      Return Home
                    </Link>
                  </div>
                </Route>
              </Switch>
            </AppLayout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
