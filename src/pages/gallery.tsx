import { useListGalleryItems } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import gallery1 from "@assets/gallery-1.png";
import gallery2 from "@assets/gallery-2.png";
import gallery3 from "@assets/gallery-3.png";
import gallery4 from "@assets/gallery-4.png";

const fallbackImages = [gallery1, gallery2, gallery3, gallery4];

export default function Gallery() {
  const { data: galleryItems, isLoading } = useListGalleryItems();

  return (
    <div className="flex flex-col w-full pt-8 pb-12 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4 md:mb-6">Visual Story</p>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl mb-4 md:mb-8">The Gallery.</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed">
            A visual exploration of the AlfaVogue lifestyle. Capturing the essence of our craftsmanship and the confidence of the men who wear our garments.
          </p>
        </div>

        <div className="columns-2 md:columns-2 lg:columns-3 gap-3 sm:gap-6 md:gap-8 space-y-3 sm:space-y-6 md:space-y-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className={`w-full ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'} mb-3 md:mb-8`} />
            ))
          ) : galleryItems?.map((item, idx) => (
            <div key={item.id} className="relative group break-inside-avoid overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-full h-auto object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackImages[idx % fallbackImages.length];
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-2 sm:p-4 md:p-6">
                <div>
                  <p className="text-white font-serif text-xs sm:text-base md:text-lg">{item.caption}</p>
                  {item.category && <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mt-1 sm:mt-2">{item.category}</p>}
                </div>
              </div>
            </div>
          ))}

          {!isLoading && (!galleryItems || galleryItems.length === 0) && (
            fallbackImages.map((img, idx) => (
              <div key={`fallback-${idx}`} className="relative group break-inside-avoid overflow-hidden">
                <img
                  src={img}
                  alt="Gallery Image"
                  className="w-full h-auto object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
