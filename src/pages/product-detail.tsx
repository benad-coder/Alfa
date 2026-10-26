import { useGetProduct, getGetProductQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import heroImg3 from "@assets/hero-3.png";

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id || "0", 10);
  
  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: {
      enabled: !!productId,
      queryKey: getGetProductQueryKey(productId)
    }
  });
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Skeleton className="w-full aspect-[3/4]" />
          <div className="space-y-8 py-10">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-24" />
            <div className="space-y-2 mt-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
        <h1 className="font-serif text-4xl mb-6">Product Not Found</h1>
        <p className="text-muted-foreground mb-10">The item you are looking for does not exist or is no longer available.</p>
        <Link href="/services" className="inline-flex h-12 items-center justify-center bg-primary text-primary-foreground px-8 text-sm uppercase tracking-widest font-medium transition-all">
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-24">
      <div className="mb-8">
        <Link href="/services" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          &larr; Back to Collection
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="relative aspect-[3/4] bg-secondary/30">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = heroImg3;
            }}
          />
        </div>

        <div className="flex flex-col pt-8 md:pt-16">
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">{product.name}</h1>
          
          <p className="text-2xl font-serif text-muted-foreground mb-10">
            {product.price ? `₵${product.price.toFixed(2)}` : 'Price on request'}
          </p>

          <div className="h-px w-full bg-border mb-10" />

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground font-light leading-relaxed mb-12">
            <p>{product.description}</p>
          </div>

          <div className="space-y-6">
             <Button
               type="button"
               onClick={() => {
                 addItem(product);
                 setAdded(true);
                 window.setTimeout(() => setAdded(false), 1800);
               }}
               className="w-full h-14 rounded-none uppercase tracking-widest text-sm font-medium"
             >
               {added ? <Check size={18} /> : <ShoppingBag size={18} />}
               {added ? "Added to Bag" : "Add to Cart"}
             </Button>
            <Link href="/contact" className="w-full inline-flex h-14 items-center justify-center bg-primary text-primary-foreground px-8 text-sm uppercase tracking-widest font-medium transition-all hover:bg-primary/90">
              Inquire About This Piece
            </Link>
            <p className="text-xs text-center text-muted-foreground tracking-wide">
              Please contact us for sizing, availability, and bespoke options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
