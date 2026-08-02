"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface PropertyScallitonProps {
  count?: number;
}

export const PropertyScalliton: React.FC<PropertyScallitonProps> = ({
  count = 6,
}) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map((_, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 shadow-sm animate-pulse dark:border-slate-800 dark:bg-slate-900/60"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-slate-200 dark:bg-slate-800">
                <div className="absolute left-3 top-3 h-6 w-20 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
                <div className="absolute right-3 top-3 h-6 w-24 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
                <div className="absolute bottom-3 left-3 h-8 w-28 rounded-lg bg-slate-400/50 dark:bg-slate-700/50" />
              </div>

              <CardHeader className="p-5 pb-2">
                <div className="space-y-2">
                  <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="flex items-center gap-2">
                    <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5 py-2 space-y-3">
                <div className="space-y-1.5">
                  <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  <div className="h-5 w-16 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-14 rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
              </CardContent>
            </div>

            <CardFooter className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 mt-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1">
                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2.5 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
              <div className="h-7 w-20 rounded-lg bg-slate-300 dark:bg-slate-800" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyScalliton;

