import { useGetFeaturedProducts } from "@workspace/api-client-react";
import { Link } from "wouter";
import heroImg from "@assets/hero-1.png";
import heroImg2 from "@assets/hero-2.png";
import heroImg3 from "@assets/hero-3.png";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: featuredProducts, isLoading } = useGetFeaturedProducts();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Gentleman in white shirt" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 pt-28 md:pt-32">
          <div className="max-w-2xl">
            <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              The Atelier Collection
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 text-foreground">
              Refined Shirts for the Modern Gentleman.
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-xl font-light leading-relaxed mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Discover our signature collection of meticulously crafted shirts, designed for those who understand that true luxury lies in the details.
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Link href="/services" className="inline-flex h-14 items-center justify-center bg-primary text-primary-foreground px-8 text-sm uppercase tracking-widest font-medium transition-all hover:bg-primary/90">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Intro */}
      <section className="py-12 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start">
            <div className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary/20 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />
              <img 
                src={heroImg2} 
                alt="Close up of shirt fabric" 
                className="relative z-10 w-full h-full object-cover grayscale-[0.2]"
              />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-3xl md:text-5xl mb-4 md:mb-8">Quiet Confidence.</h2>
              <div className="space-y-3 md:space-y-6 text-muted-foreground font-light leading-relaxed text-sm sm:text-base md:text-lg">
                <p>
                  AlfaVogue is for the modern gentleman who dresses with intention. We do not chase trends. We do not rely on flashy logos. We believe in the quiet power of a perfectly fitted shirt.
                </p>
                <p>
                  Our atelier combines traditional tailoring techniques with modern sensibilities, creating garments that radiate confidence. It's the kind of luxury you feel rather than announce.
                </p>
              </div>
              <div className="mt-6 md:mt-12">
                <Link href="/about" className="group inline-flex items-center gap-3 md:gap-4 text-primary uppercase tracking-widest text-xs sm:text-sm font-medium">
                  <span>Our Story</span>
                  <div className="h-px w-8 md:w-12 bg-primary transition-all group-hover:w-16 md:group-hover:w-24" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-16 gap-3 sm:gap-6">
            <div>
              <p className="text-primary uppercase tracking-widest text-xs sm:text-sm font-medium mb-2 md:mb-4">Curated Selection</p>
              <h2 className="font-serif text-xl sm:text-3xl md:text-5xl">Featured Pieces</h2>
            </div>
            <Link href="/services" className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-12">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="group flex flex-col gap-2">
                  <Skeleton className="w-full aspect-[3/4]" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              ))
            ) : featuredProducts?.slice(0, 3).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col gap-2">
                <div className="relative overflow-hidden aspect-[3/4] bg-secondary/50">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = heroImg3;
                    }}
                  />
                  <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 z-20 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest bg-background/90 text-foreground px-2 py-1 sm:px-4 sm:py-2 backdrop-blur-sm">View</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xs sm:text-base md:text-xl mb-1 leading-tight">{product.name}</h3>
                  <p className="text-primary font-medium tracking-wide text-xs sm:text-sm md:text-base">
                    {product.price ? `₵${product.price.toFixed(2)}` : 'On request'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 bg-secondary/20" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl mb-4 md:mb-8">Elevate Your Wardrobe.</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 font-light">
            Experience the difference of true craftsmanship. Book a consultation or explore our ready-to-wear collection today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link href="/contact" className="w-full sm:w-auto inline-flex h-10 sm:h-12 md:h-14 items-center justify-center bg-primary text-primary-foreground px-6 sm:px-8 md:px-10 text-xs sm:text-sm uppercase tracking-widest font-medium transition-all hover:bg-primary/90">
              Book Consultation
            </Link>
            <Link href="/services" className="w-full sm:w-auto inline-flex h-10 sm:h-12 md:h-14 items-center justify-center bg-transparent border border-border text-foreground px-6 sm:px-8 md:px-10 text-xs sm:text-sm uppercase tracking-widest font-medium transition-all hover:border-primary hover:text-primary">
              View Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
