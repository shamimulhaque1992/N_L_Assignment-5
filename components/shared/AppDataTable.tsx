import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type TableColumn<T> = {
  label: string | ReactNode;
  slug: string;
  render?: (item: T, index?: number) => React.ReactNode;
};

type AppDataTableProps<T> = {
  tableHeader: TableColumn<T>[];
  tableData: T[];
};

const AppDataTable = <T extends Record<string, unknown>>({
  tableHeader,
  tableData,
}: AppDataTableProps<T>) => {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        {/* ── Header ── */}
        <TableHeader>
          <TableRow className="bg-muted/60">
            {tableHeader.map((col) => (
              <TableHead
                key={col.slug}
                className="font-semibold text-foreground"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* ── Body ── */}
        <TableBody>
          {tableData && tableData?.length === 0 ? (
            // Empty state
            <TableRow>
              <TableCell
                colSpan={tableHeader?.length}
                className="text-center py-10 text-muted-foreground"
              >
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            tableData?.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {tableHeader.map((col) => (
                  <TableCell key={col.slug}>
                    {/* Use custom render if provided, otherwise read the matching key */}
                    {col.render
                      ? col.render(item, rowIndex)
                      : String(item[col.slug] ?? "-")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppDataTable;
