import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <img src="/images/alfavogue-logo-orig.jpg" alt="AlfaVogue" className="w-48 h-auto mb-2" style={{ mixBlendMode: "screen" }} />
            </Link>
            <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
              Refined shirts for the modern gentleman. We believe that dressing with intention is the ultimate expression of respect for oneself and others.
            </p>
          </div>
          
          <div>
            <h4 className="text-foreground uppercase tracking-widest text-sm font-medium mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Services</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground uppercase tracking-widest text-sm font-medium mb-6">Contact</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li className="text-muted-foreground text-sm">Accra, Ghana</li>
              <li className="text-muted-foreground text-sm">+233 592 459 953</li>
              <li className="text-muted-foreground text-sm">+233 536 489 921</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            &copy; {new Date().getFullYear()} AlfaVogue. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin/inquiries" className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
