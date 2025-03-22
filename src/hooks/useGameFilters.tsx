import { useRouter, useSearchParams } from "next/navigation";

export function useGameFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || undefined;

  const setGenre = (newGenre: string | null) => {
    if (!newGenre) {
      router.push("/");
    } else {
      router.push(`/?genre=${newGenre.toLowerCase()}`);
    }
  };
  return {
    genre,
    setGenre,
  };
}
