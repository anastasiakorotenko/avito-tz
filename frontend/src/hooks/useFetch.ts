import type { FetchParams } from "@/types/interfaces";
import { useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunction: (params: FetchParams) => Promise<T>,
  params: FetchParams
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction(params);
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Ошибка получения данных")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, params]);

  return { data, loading, error };
};

export default useFetch;
