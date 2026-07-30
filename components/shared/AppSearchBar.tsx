"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { Input } from "../ui/input";

const AppSearchBar = ({
  className,
  placeholder = "Search",
}: {
  className?: string | undefined;
  placeholder?: string | undefined;
}) => {
  const debounceReference = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (searchTerm: string) => {
    if (debounceReference.current) {
      clearTimeout(debounceReference.current);
    }
    debounceReference.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set("searchTerm", searchTerm);
      } else {
        params.delete("searchTerm");
      }
      router.replace(`${pathName}?${params.toString()}`);
    }, 500);
  };
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        defaultValue={
          searchParams.get("searchTerm")
            ? searchParams.get("searchTerm")?.toString()
            : ""
        }
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  );
};

export default AppSearchBar;
