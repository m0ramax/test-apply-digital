import { Suspense } from "react";
import { allGames } from "../utils/endpoint";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Filter from "../components/Filter";

async function GameList({ genre }: { genre?: string }) {
  const url = genre
    ? `http://localhost:3000/api/games?genre=${genre}`
    : "http://localhost:3000/api/games";
  const response = await fetch(url);
  const data = await response.json();
  return <Card game={data.games} />;
}
export default async function Home({
  searchParams,
}: {
  searchParams: { genre?: string };
}) {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Header />
      <Filter />
      <div className="flex-grow px-4 md:px-8 lg:px-12">
        <div className="w-full max-w-[1440px] my-8">
          <Suspense fallback={<Loading />}>
            <GameList genre={searchParams.genre} />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
}
