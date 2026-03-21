"use client";

import { useEffect, useState } from "react";

export type Currency = {
  isIndia: boolean;
  symbol: "₹" | "$";
};

export function useCurrency(): Currency {
  const [isIndia, setIsIndia] = useState<boolean>(false);

  useEffect(() => {
    const cached = sessionStorage.getItem("appletpod_country");
    if (cached) {
      setIsIndia(cached === "IN");
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const country = (data?.country_code as string) ?? "";
        sessionStorage.setItem("appletpod_country", country);
        setIsIndia(country === "IN");
      })
      .catch(() => {
        // Default to USD on failure — do nothing
      });
  }, []);

  return {
    isIndia,
    symbol: isIndia ? "₹" : "$",
  };
}
