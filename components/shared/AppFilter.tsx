"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type SingleField = {
  type: "single";
  label: string;
  placeholder?: string;
  paramKey: string;
};

export type DoubleField = {
  type: "double";
  label: string;
  firstInput: { placeholder?: string; paramKey: string };
  secondInput: { placeholder?: string; paramKey: string };
};

export type CheckboxField = {
  type: "checkbox";
  label: string;
  paramKey: string;
  options: { label: string; value: string }[];
};

/** Checkboxes but only one can be selected at a time — stored as a plain string */
export type SingleCheckboxField = {
  type: "single-checkbox";
  label: string;
  paramKey: string;
  options: { label: string; value: string }[];
};

export type FilterField =
  | SingleField
  | DoubleField
  | CheckboxField
  | SingleCheckboxField;

function parseChecked(raw: string | null): string[] {
  try {
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AppFilter({ fields }: { fields: FilterField[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = useState<Record<string, string | string[]>>(
    () => {
      const init: Record<string, string | string[]> = {};
      fields.forEach((f) => {
        if (f.type === "single") {
          init[f.paramKey] = searchParams.get(f.paramKey) ?? "";
        } else if (f.type === "double") {
          init[f.firstInput.paramKey] =
            searchParams.get(f.firstInput.paramKey) ?? "";
          init[f.secondInput.paramKey] =
            searchParams.get(f.secondInput.paramKey) ?? "";
        } else if (f.type === "checkbox") {
          init[f.paramKey] = parseChecked(searchParams.get(f.paramKey));
        } else {
          init[f.paramKey] = searchParams.get(f.paramKey) ?? "";
        }
      });
      return init;
    },
  );

  function set(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function toggleCheck(paramKey: string, value: string, checked: boolean) {
    setValues((prev) => {
      const current = (prev[paramKey] as string[]) ?? [];
      return {
        ...prev,
        [paramKey]: checked
          ? [...current, value]
          : current.filter((v) => v !== value),
      };
    });
  }

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    fields.forEach((f) => {
      if (f.type === "single") {
        const v = values[f.paramKey] as string;
        v ? params.set(f.paramKey, v) : params.delete(f.paramKey);
      } else if (f.type === "double") {
        const v1 = values[f.firstInput.paramKey] as string;
        const v2 = values[f.secondInput.paramKey] as string;
        v1
          ? params.set(f.firstInput.paramKey, v1)
          : params.delete(f.firstInput.paramKey);
        v2
          ? params.set(f.secondInput.paramKey, v2)
          : params.delete(f.secondInput.paramKey);
      } else if (f.type === "checkbox") {
        const arr = values[f.paramKey] as string[];
        arr.length
          ? params.set(f.paramKey, JSON.stringify(arr))
          : params.delete(f.paramKey);
      } else {
        // single-checkbox
        const v = values[f.paramKey] as string;
        v ? params.set(f.paramKey, v) : params.delete(f.paramKey);
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  function clear() {
    const params = new URLSearchParams(searchParams.toString());
    const reset: Record<string, string | string[]> = {};
    fields.forEach((f) => {
      if (f.type === "single") {
        reset[f.paramKey] = "";
        params.delete(f.paramKey);
      } else if (f.type === "double") {
        reset[f.firstInput.paramKey] = "";
        reset[f.secondInput.paramKey] = "";
        params.delete(f.firstInput.paramKey);
        params.delete(f.secondInput.paramKey);
      } else if (f.type === "checkbox") {
        reset[f.paramKey] = [];
        params.delete(f.paramKey);
      } else {
        reset[f.paramKey] = "";
        params.delete(f.paramKey);
      }
    });
    setValues(reset);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="flex flex-col gap-4 w-full max-h-[50vh] overflow-y-auto"
      >
        {fields.map((f, i) => {
          if (f.type === "single") {
            return (
              <div key={i} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">{f.label}</label>
                <Input
                  placeholder={f.placeholder}
                  value={values[f.paramKey] as string}
                  onChange={(e) => set(f.paramKey, e.target.value)}
                />
              </div>
            );
          }

          if (f.type === "double") {
            return (
              <div key={i} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">{f.label}</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={f.firstInput.placeholder}
                    value={values[f.firstInput.paramKey] as string}
                    onChange={(e) => set(f.firstInput.paramKey, e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder={f.secondInput.placeholder}
                    value={values[f.secondInput.paramKey] as string}
                    onChange={(e) =>
                      set(f.secondInput.paramKey, e.target.value)
                    }
                  />
                </div>
              </div>
            );
          }

          if (f.type === "checkbox") {
            const selected = values[f.paramKey] as string[];
            return (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm font-medium">{f.label}</label>
                {f.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.includes(opt.value)}
                      onCheckedChange={(checked) =>
                        toggleCheck(f.paramKey, opt.value, !!checked)
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            );
          }

          if (f.type === "single-checkbox") {
            const selected = values[f.paramKey] as string;
            return (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm font-medium">{f.label}</label>
                {f.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selected === opt.value}
                      onCheckedChange={(checked) =>
                        setValues((prev) => ({
                          ...prev,
                          [f.paramKey]: checked ? opt.value : "",
                        }))
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            );
          }
        })}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <button
            onClick={clear}
            className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-muted transition"
          >
            Clear
          </button>
          <button
            onClick={apply}
            className="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
