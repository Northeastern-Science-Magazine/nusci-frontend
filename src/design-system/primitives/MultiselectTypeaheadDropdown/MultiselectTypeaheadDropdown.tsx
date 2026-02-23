"use client";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Divider from "../Divider";
import Icon from "../Icon";

/* ============================================================
   Types
   ============================================================ */

export type MultiSelectOption = {
  label: string;
  value: string;
};

export interface MultiSelectProps {
  options: MultiSelectOption[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  maxVisibleItems?: number;
  itemHeight?: number;
  className?: string;
}

/* ============================================================
   Utils
   ============================================================ */

function rankAndFilter(options: MultiSelectOption[], query: string) {
  if (!query) return options;

  const q = query.toLowerCase();

  return options
    .filter((o) => o.label.toLowerCase().includes(q))
    .sort((a, b) => {
      const aStarts = a.label.toLowerCase().startsWith(q);
      const bStarts = b.label.toLowerCase().startsWith(q);
      if (aStarts === bStarts) return 0;
      return aStarts ? -1 : 1;
    });
}

function useAnchorPosition(anchorRef: React.RefObject<HTMLElement>, open: boolean) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const update = useCallback(() => {
    if (!anchorRef.current) return;
    setRect(anchorRef.current.getBoundingClientRect());
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!open) return;
    update();
  }, [open, update]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, update]);

  return rect;
}

/* ============================================================
   Component
   ============================================================ */

export function MultiselectTypeaheadDropdown({
  options,
  defaultValue = [],
  onChange,
  placeholder = "Search...",
  maxVisibleItems = 8,
  itemHeight = 36,
  className,
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const anchorRect = useAnchorPosition(inputRef, open);

  const selectedSet = useMemo(() => new Set(selectedValues), [selectedValues]);

  const selectedOptions = useMemo(() => options.filter((o) => selectedSet.has(o.value)), [options, selectedSet]);

  const unselectedOptions = useMemo(() => {
    const base = options.filter((o) => !selectedSet.has(o.value));
    return rankAndFilter(base, query);
  }, [options, selectedSet, query]);

  const visibleItems = selectedOptions.length + unselectedOptions.length;

  const maxHeight = maxVisibleItems * itemHeight;

  /* ============================================================
     Selection
     ============================================================ */

  const updateSelection = (values: string[]) => {
    setSelectedValues(values);
    onChange?.(values);
  };

  const toggle = (value: string) => {
    const next = new Set(selectedValues);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    updateSelection(Array.from(next));
  };

  /* ============================================================
     Outside click
     ============================================================ */

  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current?.contains(t) || popupRef.current?.contains(t)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ============================================================
     Render
     ============================================================ */

  return (
    <div ref={containerRef} className="relative w-full flex">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
        <Icon icon="search" size="xs" color="neutral" />
      </span>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={clsx("w-full border border-border rounded-md px-3 py-2 pl-9", open && "rounded-b-none", className)}
      />

      {open &&
        anchorRect &&
        createPortal(
          <div
            ref={popupRef}
            className="fixed z-50 bg-white rounded-b-md shadow-lg overflow-hidden"
            style={{
              top: anchorRect.bottom,
              left: anchorRect.left,
              width: anchorRect.width,
            }}
          >
            <div style={{ maxHeight }} className="overflow-auto p-1">
              {selectedOptions.map((opt) => (
                <OptionRow key={opt.value} option={opt} selected onSelect={toggle} />
              ))}

              {selectedOptions.length > 0 && unselectedOptions.length > 0 && <Divider />}

              {unselectedOptions.map((opt) => (
                <OptionRow key={opt.value} option={opt} selected={false} onSelect={toggle} />
              ))}

              {visibleItems === 0 && <div className="px-3 py-2 text-sm text-gray-500 text-center">No matches</div>}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

/* ============================================================
   Subcomponents
   ============================================================ */

function OptionRow({
  option,
  selected,
  onSelect,
}: {
  option: MultiSelectOption;
  selected: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onSelect(option.value)}
      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-border rounded-md"
    >
      <span className="w-4">{selected && <Icon icon="check" size="sm" />}</span>
      {option.label}
    </button>
  );
}
