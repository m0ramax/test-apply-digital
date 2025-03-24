import { Suspense } from "react";
import HomeContent from "@/components/layout/HomeContent";
import Loading from "@/components/common/Loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
