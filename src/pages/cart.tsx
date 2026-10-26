import { Link } from "wouter";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import heroImg3 from "@assets/hero-3.png";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="flex flex-col w-full pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 md:mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4">
            Your Selection
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-4">
            Shopping Bag
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base font-light">
            Review the pieces you have selected from the AlfaVogue collection.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="border border-border/70 px-5 py-16 md:py-24 text-center">
            <p className="font-serif text-2xl md:text-3xl mb-4">Your bag is empty.</p>
            <p className="text-muted-foreground text-sm mb-8">
              Discover something refined for your next occasion.
            </p>
            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center bg-primary text-primary-foreground px-7 text-xs uppercase tracking-widest font-medium transition-colors hover:bg-primary/90"
            >
              Explore the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-10 lg:gap-16 items-start">
            <div className="divide-y divide-border/70 border-y border-border/70">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="py-5 md:py-7 grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr_auto] gap-4 md:gap-6 items-center"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="block aspect-[3/4] bg-secondary/50 overflow-hidden"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = heroImg3;
                      }}
                    />
                  </Link>

                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {product.category.replace("-", " ")}
                    </p>
                    <Link
                      href={`/product/${product.id}`}
                      className="font-serif text-base sm:text-xl leading-tight hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-primary text-xs sm:text-sm mt-2">
                      {product.price ? `₵${product.price.toFixed(2)}` : "Price on request"}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="h-7 w-7 border border-border inline-flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        aria-label={`Decrease ${product.name} quantity`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-sm">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="h-7 w-7 border border-border inline-flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        aria-label={`Increase ${product.name} quantity`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="col-start-2 sm:col-start-auto flex items-center justify-between sm:block sm:text-right">
                    <p className="font-serif text-base sm:text-lg">
                      {product.price
                        ? `₵${(product.price * quantity).toFixed(2)}`
                        : "On request"}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(product.id)}
                      className="mt-1 px-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={14} />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="border border-border/70 p-5 md:p-7 lg:sticky lg:top-32">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              <div className="flex items-center justify-between border-t border-border/70 pt-5 mb-7">
                <span className="text-sm text-muted-foreground">Estimated total</span>
                <span className="font-serif text-xl">
                  {subtotal ? `₵${subtotal.toFixed(2)}` : "On request"}
                </span>
              </div>
              <Link
                href="/contact"
                className="w-full inline-flex h-12 items-center justify-center bg-primary text-primary-foreground px-5 text-xs uppercase tracking-widest font-medium transition-colors hover:bg-primary/90"
              >
                Request Order
              </Link>
              <p className="text-xs text-muted-foreground text-center leading-relaxed mt-4">
                We will confirm sizing, availability, and delivery details with you.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}