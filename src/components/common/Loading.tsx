export default function Loading() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-10">
        {[...Array(12)].map((_, idx) => (
          <div
            key={idx}
            className="w-full h-full border-[0.5px] border-primary-base rounded-2xl overflow-hidden p-4 flex flex-col animate-pulse"
          >
            <div className="relative w-full aspect-[4/3] bg-primary-card-background rounded-t-2xl" />
            <div className="flex flex-col flex-1 p-3">
              <div className="h-3 bg-primary-card-background rounded w-1/4 mb-1" />
              <div className="w-full flex justify-between mb-2">
                <div className="h-5 bg-primary-card-background rounded w-1/2" />
                <div className="h-5 bg-primary-card-background rounded w-1/6" />
              </div>
              <div className="mt-auto">
                <div className="w-full h-10 bg-primary-card-background rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}