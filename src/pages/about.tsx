import heroImg3 from "@assets/hero-3.png";
import gallery3 from "@assets/gallery-3.png";

export default function About() {
  return (
    <div className="flex flex-col w-full pt-8 pb-12 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-3 md:mb-6">Our Heritage</p>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl mb-3 md:mb-8">A Tradition of Excellence.</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed">
            AlfaVogue was founded on a simple principle: a shirt is not just a garment, but a statement of intent. We believe in the quiet confidence that comes from wearing something crafted with absolute precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start mb-10 md:mb-32">
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] relative">
              <img src={heroImg3} alt="Man in dark shirt" className="w-full h-full object-cover grayscale-[0.2]" />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl mb-3 md:mb-6">The AlfaVogue Philosophy</h2>
            <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed mb-3 md:mb-6">
              In a world of fast fashion and disposable clothing, we stand for enduring quality. Every AlfaVogue shirt is the result of countless hours of design, pattern-making, and refinement.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
              We source only the finest fabrics from the world's most respected mills. Our obsession with detail extends from the exact placement of a button to the perfect tension in a seam.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start mb-10 md:mb-32">
          <div>
            <div className="aspect-[4/3] relative">
              <img src={gallery3} alt="Craftsmanship" className="w-full h-full object-cover grayscale-[0.2]" />
            </div>
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl mb-3 md:mb-6 mt-4 md:mt-0">Uncompromising Craftsmanship</h2>
            <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed mb-3 md:mb-6">
              Our atelier is home to artisans who have dedicated their lives to the art of shirtmaking. They understand that true luxury is hidden in the construction—in the things you cannot immediately see.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
              It's the single-needle stitching that ensures durability. It's the split yoke that guarantees comfort across the shoulders. It's the mother-of-pearl buttons that add a touch of quiet elegance.
            </p>
          </div>
        </div>

        <div className="bg-secondary/30 p-6 sm:p-10 md:p-24 text-center max-w-5xl mx-auto">
          <h2 className="font-serif text-xl sm:text-2xl md:text-4xl mb-3 md:mb-8">Our Promise</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            When you wear an AlfaVogue shirt, you are wearing a garment that has been considered from every angle. We promise garments that not only look exceptional but feel extraordinary, empowering you to navigate the world with quiet confidence.
          </p>
        </div>

      </div>
    </div>
  );
}
