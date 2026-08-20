import React, { useState, useMemo } from "react";
import { Filter, Download, AlertCircle, PhoneOff } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import SortArrow, { SortDirection } from "./SortArrow";
import SearchInput from "./SearchInput";
import PaginationControls from "./PaginationControls";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface FilterOption {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchableKeys?: string[]; // Keys to search across
  filters?: FilterOption[];  // Custom dropdown filters
  exportFileName?: string;
  onRowClick?: (item: T) => void;
  enableMultiSelect?: boolean;
  multiSelectActions?: (selectedItems: T[], clearSelection: () => void) => React.ReactNode;
  emptyStateMessage?: string;
  emptyStateSubMessage?: string;
  emptyStateIcon?: React.ReactNode;
  disablePagination?: boolean;
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchableKeys = [],
  filters = [],
  exportFileName = "export.xlsx",
  onRowClick,
  enableMultiSelect = false,
  multiSelectActions,
  emptyStateMessage = "No records found",
  emptyStateSubMessage = "Try adjusting your filters or search query.",
  emptyStateIcon = <PhoneOff className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />,
  disablePagination = false
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: SortDirection }>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  // Handle Search and Filter
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchQuery && searchableKeys.length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => {
        return searchableKeys.some(key => {
          const val = (item as any)[key];
          return val && String(val).toLowerCase().includes(q);
        });
      });
    }

    // Dropdown Filters
    Object.keys(filterValues).forEach(filterKey => {
      const selectedOptions = filterValues[filterKey];
      if (selectedOptions && selectedOptions.length > 0) {
        result = result.filter(item => selectedOptions.includes(String((item as any)[filterKey])));
      }
    });

    return result;
  }, [data, searchQuery, filterValues, searchableKeys]);

  // Handle Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = (a as any)[sortConfig.key!];
      const bVal = (b as any)[sortConfig.key!];
      
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage) || 1;
  const paginatedData = disablePagination ? sortedData : sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const cycleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const handleExport = () => {
    if (sortedData.length === 0) return;
    
    // We only export what we have displayed, formatted nicely
    const exportData = sortedData.map(item => {
      const exportRow: any = {};
      columns.forEach(col => {
        if (col.key !== "actions" && col.key !== "checkbox") {
          exportRow[col.label] = (item as any)[col.key] || "";
        }
      });
      return exportRow;
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "Export");
    XLSX.writeFile(wb, exportFileName);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedData.map(item => item.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedIds(newSelected);
  };

  const clearSelection = () => setSelectedIds(new Set());
  const selectedItems = sortedData.filter(item => selectedIds.has(item.id));

  return (
    <div className="flex flex-col h-full rounded-3xl border border-white/20 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/60 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Sticky Action Bar for Multi-Select */}
      {enableMultiSelect && selectedIds.size > 0 && multiSelectActions && (
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between rounded-t-3xl border-b border-indigo-200/50 bg-indigo-50/80 backdrop-blur-md px-6 py-4 dark:border-indigo-900/50 dark:bg-indigo-900/40">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-indigo-700 dark:text-indigo-300">
              {selectedIds.size} {selectedIds.size === 1 ? 'item' : 'items'} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            {multiSelectActions(selectedItems, clearSelection)}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className={`relative z-10 flex flex-col gap-4 border-b border-white/20 p-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between shrink-0 ${selectedIds.size > 0 ? 'opacity-0 pointer-events-none' : ''}`}>
        
        {/* Search */}
        {searchableKeys.length > 0 && (
          <SearchInput 
            value={searchQuery} 
            onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }} 
          />
        )}

        {/* Filters and Export */}
        <div className="flex flex-wrap items-center gap-3">
          {filters.map(filter => {
            const selectedCount = filterValues[filter.key]?.length || 0;
            const isOpen = openFilterDropdown === filter.key;
            
            return (
              <div key={filter.key} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilterDropdown(isOpen ? null : filter.key)}
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition-all backdrop-blur-md shadow-sm
                    ${selectedCount > 0 
                      ? 'border-violet-500/50 bg-violet-50/80 text-violet-700 dark:border-violet-500/50 dark:bg-violet-900/30 dark:text-violet-300' 
                      : 'border-white/40 bg-white/70 text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-zinc-800/70 dark:text-zinc-300 dark:hover:bg-zinc-700/80'
                    }`}
                >
                  <Filter className="h-4 w-4" />
                  <span>{filter.label} {selectedCount > 0 && `(${selectedCount})`}</span>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 z-50 rounded-xl border border-white/40 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/95">
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {filter.options.map(opt => {
                        const isSelected = filterValues[filter.key]?.includes(opt.value);
                        return (
                          <label key={opt.value} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-zinc-100 cursor-pointer dark:hover:bg-zinc-800">
                            <input 
                              type="checkbox"
                              checked={isSelected || false}
                              onChange={(e) => {
                                setFilterValues(prev => {
                                  const current = prev[filter.key] || [];
                                  if (e.target.checked) {
                                    return { ...prev, [filter.key]: [...current, opt.value] };
                                  } else {
                                    return { ...prev, [filter.key]: current.filter(v => v !== opt.value) };
                                  }
                                });
                                setCurrentPage(1);
                              }}
                              className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500 bg-white dark:bg-zinc-900 dark:border-zinc-600"
                            />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    
                    {selectedCount > 0 && (
                      <div className="mt-2 border-t border-zinc-100 pt-2 dark:border-zinc-800">
                        <button
                          onClick={() => {
                            setFilterValues(prev => ({ ...prev, [filter.key]: [] }));
                            setCurrentPage(1);
                          }}
                          className="w-full rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                        >
                          Clear Selection
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <Button 
            variant="outline"
            className="rounded-2xl px-5 py-2 font-semibold shadow-sm border-white/40 bg-white/70 backdrop-blur-md hover:bg-white dark:border-white/10 dark:bg-zinc-800/70 dark:hover:bg-zinc-700/80 transition-all"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-x-auto overflow-y-auto relative z-10">
        {paginatedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/50 backdrop-blur-md border border-white/20 shadow-sm dark:bg-zinc-800/50 dark:border-white/10">
              {emptyStateIcon}
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{emptyStateMessage}</h3>
            <p className="mt-1 text-sm text-zinc-500">{emptyStateSubMessage}</p>
            <Button 
              variant="outline"
              className="mt-6 rounded-xl border-white/40 bg-white/70 backdrop-blur-md hover:bg-white dark:border-white/10 dark:bg-zinc-800/70"
              onClick={() => { setSearchQuery(""); setFilterValues({}); }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400 border-collapse">
            <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-zinc-900/80 shadow-sm">
              <tr>
                {enableMultiSelect && (
                  <th className="px-6 py-4 w-12 border-b border-white/20 dark:border-white/10">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500 shadow-sm bg-white/50 dark:bg-zinc-800/50"
                      checked={paginatedData.length > 0 && paginatedData.every(item => selectedIds.has(item.id))}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                )}
                {columns.map(col => (
                  <th 
                    key={col.key} 
                    className={`group px-6 py-4 border-b border-white/20 dark:border-white/10 transition-colors ${col.sortable ? 'cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50' : ''}`}
                    onClick={() => col.sortable && cycleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && (
                        <SortArrow direction={sortConfig.key === col.key ? sortConfig.direction : null} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20 dark:divide-white/10 bg-transparent">
              {paginatedData.map(item => (
                <tr 
                  key={item.id} 
                  className={`group transition-all duration-300 hover:bg-white/80 dark:hover:bg-zinc-800/80 ${onRowClick ? 'cursor-pointer' : ''} ${selectedIds.has(item.id) ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {enableMultiSelect && (
                     <td className="px-6 py-4 w-12" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500 shadow-sm bg-white/50 dark:bg-zinc-800/50"
                        checked={selectedIds.has(item.id)}
                        onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!disablePagination && paginatedData.length > 0 && (
        <div className="relative z-10 border-t border-white/20 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md">
          <PaginationControls 
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalItems={sortedData.length}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
}
