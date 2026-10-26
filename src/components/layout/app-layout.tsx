import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground dark">
      <Navbar />
      <main className="flex-1 flex flex-col pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
