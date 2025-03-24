export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(9)].map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-slate-400 rounded-lg p-4 shadow-md animate-pulse"
        >
          <div className="relative w-full aspect-square bg-slate-300 rounded-lg" />
          <div className="mt-4 w-full flex flex-col items-center space-y-2">
            <div className="h-6 bg-slate-300 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-slate-300 rounded w-1/2 mx-auto mt-2" />
            <div className="h-4 bg-slate-300 rounded w-1/4 mx-auto mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
