import LayoutWithSide from "@/components/Layout/LayoutWithSide";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Link from "next/link";
import { useEffect, useState } from "react";

import useSWR from "swr";
const Statistics = () => {
  const { data } = useSWR([`/api/statistics`], makeSecuredRequest, {
    refreshInterval: 1000,
  });

  const [statistics, setStatistics] = useState<Record<string, number>>({
    users: 0,
    products: 0,
    purchases: 0,
    pending_deliveries: 0,
  });

  useEffect(() => {
    if (data) {
      setStatistics(data.statistics);
    }
  }, [data]);
  const keys = Object.keys(statistics);
  return (
    <LayoutWithSide>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-yellow-600">Statistics</h1>
        <div className="flex flex-col gap-4">
          {keys.map((key) => (
            <Link
              href={
                !key.includes("pending") ? `/${key}` : `/orders?status=pending`
              }
              key={key}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold dark:text-neutral-100 text-lg">
                  Number of {key.replaceAll("_", " ")}
                </span>{" "}
                : <span className="text-3xl">{statistics[key]}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LayoutWithSide>
  );
};

export default Statistics;
