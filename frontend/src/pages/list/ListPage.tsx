import { fetchData } from "@/api/api";
import { CardsList, CardsSort, CardsFilters } from "@/components/cards/index";
import Button from "@/components/ui/Button";
import { useDebounce } from "@/hooks/useDedounce";
import useFetch from "@/hooks/useFetch";
import type { FetchParams } from "@/types/interfaces";
import { useEffect, useMemo, useState } from "react";
import { useAdsStore } from "@/store/useAdsStore";
import { useTheme } from "@/theme/useTheme";
import Pagination from "@/components/ui/Pagination";
import useHotkeys from "@reecelucas/react-use-hotkeys";

function ListPage() {
  useEffect(() => {
    document.title = "Главная";
  }, []);

  const { theme, toggleTheme } = useTheme();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string[]>([]);
  const [categoryId, setCategory] = useState<number | null>(null);

  const [searchPrice, setSearchPrice] = useState<[string, string]>(["", ""]);
  const debouncedPrice = useDebounce(searchPrice, 400);
  const priceRange = useMemo<[number | null, number | null]>(() => {
    const [minPrice, maxPrice] = debouncedPrice;
    return [
      minPrice === "" ? null : Number(minPrice),
      maxPrice === "" ? null : Number(maxPrice),
    ];
  }, [debouncedPrice]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const setFilteredAds = useAdsStore((state) => state.setFilteredAds);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setStatus([...status, value]);
    } else {
      setStatus(status.filter((item) => item !== value));
    }
  };

  const params = useMemo<FetchParams>(
    () => ({
      page,
      status,
      categoryId,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search: debouncedSearch,
      sortBy,
      sortOrder,
    }),
    [page, status, categoryId, priceRange, debouncedSearch, sortBy, sortOrder]
  );

  const { data, loading, error } = useFetch(fetchData, params);

  setFilteredAds(data?.ads);

  useHotkeys('/', (e) => {
    e.preventDefault();
    document.getElementById("searchInput")?.focus()
  })

  return (
    <div className="w-full dark:bg-gray-950/90 bg-white">
      <div className="flex flex-col max-w-5/6 mx-auto px-auto py-3 items-center gap-7">
        <div className="flex w-full justify-end">
          <Button
            onClick={toggleTheme}
            className="bg-white dark:bg-black dark:text-white text-black text-sm px-3 py-1 rounded border border-gray-500 hover:bg-gray-300 hover:text-white hover:dark:text-black dark:hover:bg-gray-300 transition w-20"
            value={theme === "dark" ? "🌕 light" : "🌑 dark"}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <CardsFilters
            status={status}
            categoryId={categoryId}
            search={search}
            searchPrice={searchPrice}
            setCategory={setCategory}
            setSearchPrice={setSearchPrice}
            setSearch={setSearch}
            resetFilters={() => {
              setStatus([]);
              setCategory(null);
              setSearchPrice(["0", "100000"]);
              setSearch("");
              setPage(1);
            }}
            handleCheckboxChange={handleCheckboxChange}
          />

          <CardsSort
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>

        <CardsList items={data?.ads ?? []} loading={loading} error={error} />

        {data?.pagination && (
          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
            totalItems={data.pagination.totalItems}
          />
        )}
      </div>
    </div>
  );
}

export default ListPage;
