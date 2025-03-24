export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(9)].map((_, idx) => (
        <div
          key={idx}
          className="w-full h-full border-[0.5px] border-primary-base rounded-2xl overflow-hidden p-4 flex flex-col"
        >
          <div className="relative w-full aspect-[4/3] bg-slate-200 rounded-t-2xl" />
          <div className="p-3 flex flex-col flex-1">
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-1" />
            <div className="w-full flex justify-between mb-4">
              <div className="h-6 bg-slate-200 rounded w-1/2" />
              <div className="h-6 bg-slate-200 rounded w-1/6" />
            </div>
            <div className="mt-auto">
              <div className="w-full h-10 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}