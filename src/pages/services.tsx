import { useListProducts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import heroImg3 from "@assets/hero-3.png";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [recentlyAdded, setRecentlyAdded] = useState<number | null>(null);
  const { addItem } = useCart();
  const { data: products, isLoading } = useListProducts(activeCategory !== "all" ? { category: activeCategory } : undefined);

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "short-sleeve", label: "Short Sleeve" },
    { id: "long-sleeve", label: "Long Sleeve" },
    { id: "essentials", label: "Essentials" }
  ];

  return (
    <div className="flex flex-col w-full pt-8 pb-12 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4 md:mb-6">Our Offerings</p>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl mb-4 md:mb-8">The Collections.</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Curated pieces for every occasion. Explore our meticulously designed collections, each piece crafted to perfection.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 mb-8 md:mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-xs sm:text-sm tracking-widest uppercase pb-2 transition-all ${
                activeCategory === category.id
                  ? "text-primary border-b-2 border-primary font-medium"
                  : "text-muted-foreground border-b-2 border-transparent hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:gap-x-8 md:gap-y-16">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group flex flex-col gap-2 sm:gap-4">
                <Skeleton className="w-full aspect-[3/4]" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))
          ) : products?.map((product) => (
            <div key={product.id} className="group flex flex-col gap-2 sm:gap-3">
              <Link href={`/product/${product.id}`} className="block">
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
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 z-20 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest bg-background/90 text-foreground px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 backdrop-blur-sm">View</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category.replace("-", " ")}</p>
                <h3 className="font-serif text-sm sm:text-base md:text-xl mb-1 leading-tight">{product.name}</h3>
                <p className="text-primary font-medium tracking-wide text-xs sm:text-sm md:text-base">
                  {product.price ? `₵${product.price.toFixed(2)}` : 'Price on request'}
                </p>
              </div>
              </Link>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  addItem(product);
                  setRecentlyAdded(product.id);
                  window.setTimeout(() => setRecentlyAdded(null), 1800);
                }}
                className="w-full rounded-none uppercase tracking-[0.12em] text-[10px] sm:text-xs"
              >
                {recentlyAdded === product.id ? <Check size={14} /> : <ShoppingBag size={14} />}
                {recentlyAdded === product.id ? "Added" : "Add to Cart"}
              </Button>
            </div>
          ))}

          {!isLoading && products?.length === 0 && (
            <div className="col-span-full text-center py-12 md:py-24">
              <p className="text-muted-foreground text-sm md:text-lg">No products found in this category.</p>
            </div>
          )}
        </div>

        <div className="mt-16 pt-16 md:mt-32 md:pt-32 border-t border-border/50 text-center max-w-4xl mx-auto">
          <p className="text-primary uppercase tracking-widest text-xs sm:text-sm font-medium mb-4 md:mb-6">Bespoke Service</p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-5xl mb-4 md:mb-8">Styling & Fashion Consultation</h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-6 md:mb-10 text-sm sm:text-base md:text-lg">
            Elevate your personal style with our private consultation service. Meet with our expert stylists to discuss your wardrobe needs, get personalized recommendations, and discover pieces that complement your unique profile.
          </p>
          <Link href="/contact" className="inline-flex h-10 sm:h-12 md:h-14 items-center justify-center bg-transparent border border-border text-foreground px-6 sm:px-8 md:px-10 text-xs sm:text-sm uppercase tracking-widest font-medium transition-all hover:border-primary hover:text-primary">
            Request Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
