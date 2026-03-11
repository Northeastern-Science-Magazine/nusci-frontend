"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Divider from "../Divider";
import Icon from "../Icon";
import { dropdownVariants, DropdownProps, DropdownOption } from "./variants";

export function Dropdown(props: DropdownProps) {
  const {
    options,
    defaultValue,
    onChange,
    placeholder = "Select...",
    maxVisibleItems = 8,
    itemHeight = 36,
    className,
    color = "neutral",
  } = props;

  /* Determines what type of dropdown, and which subcomponents to render */
  const cfg = useVariantConfig(props);

  const [selected, setSelected] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : typeof defaultValue === "string" && defaultValue ? [defaultValue] : [],
  );

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const anchorRect = useAnchorPosition(inputRef, open);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const select = (value: string) => {
    if (cfg.isMulti) {
      const next = new Set(selectedSet);
      next.has(value) ? next.delete(value) : next.add(value);
      const arr = Array.from(next);
      setSelected(arr);
      onChange?.(arr);
    } else {
      setSelected([value]);
      onChange?.(value);
      setOpen(false);
      setQuery("");
    }
  };

  const selectedOptions = useMemo(() => options.filter((o) => selectedSet.has(o.value)), [options, selectedSet]);

  const availableOptions = useMemo(() => {
    const unselected = options.filter((o) => !selectedSet.has(o.value));
    return cfg.isTypeahead ? rankAndFilter(unselected, query) : unselected;
  }, [options, selectedSet, cfg.isTypeahead, query]);

  const visibleItems = availableOptions.length;
  const maxHeight = maxVisibleItems * itemHeight;

  const displayValue = useMemo(() => {
    if (cfg.isTypeahead) {
      if (query) return query;
      if (!cfg.isMulti) return selectedOptions[0]?.label ?? "";
      return "";
    }

    if (cfg.isMulti) {
      return selectedOptions.length ? `${selectedOptions.length} selected` : "";
    }

    return selectedOptions[0]?.label ?? "";
  }, [query, selectedOptions, cfg]);

  /* Input Controller */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cfg.isTypeahead) return;

    const value = e.target.value;
    setQuery(value);
    setOpen(true);

    if (!cfg.isMulti && value && selected.length) {
      setSelected([]);
      onChange?.("");
    }
  };

  const handleInputMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    if (cfg.isTypeahead) return;
    e.preventDefault();
    setOpen((o) => !o);
  };

  /* Blur Action (outside click) */
  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current?.contains(t) || popupRef.current?.contains(t)) return;
      setOpen(false);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [open]);

  /* TV slots for styling subcomponents */
  const styles = dropdownVariants({
    color,
    icon: cfg.showIcon,
    chevron: cfg.showChevron,
    open,
    multiSelect: cfg.isMulti,
    typeahead: cfg.isTypeahead,
  });

  const inputClassName = clsx(styles.input(), !cfg.isTypeahead && "cursor-pointer", className);

  return (
    <div ref={containerRef} className="relative w-full flex">
      {cfg.showIcon && (
        <span className={styles.iconContainer()}>
          <Icon icon="search" size="xs" color={color} />
        </span>
      )}

      {cfg.showChevron && (
        <span className={styles.chevronContainer()}>
          <Icon icon={open ? "chevronUp" : "chevronDown"} size="md" color={color} />
        </span>
      )}

      <input
        ref={inputRef}
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => cfg.isTypeahead && setOpen(true)}
        onMouseDown={handleInputMouseDown}
        readOnly={cfg.inputReadOnly}
        placeholder={placeholder}
        className={inputClassName}
      />

      {open &&
        anchorRect &&
        createPortal(
          <div
            ref={popupRef}
            className={styles.popup()}
            style={{
              top: anchorRect.bottom,
              left: anchorRect.left,
              width: anchorRect.width,
            }}
          >
            <div style={{ maxHeight }} className={styles.popupContent()}>
              {cfg.isMulti && selectedOptions.length > 0 && (
                <>
                  {selectedOptions.map((opt) => (
                    <OptionRow key={opt.value} option={opt} selected onSelect={select} className={styles.optionRow()} />
                  ))}
                  {availableOptions.length >= 0 && <Divider />}
                </>
              )}

              {availableOptions.map((opt) => (
                <OptionRow
                  key={opt.value}
                  option={opt}
                  selected={selectedSet.has(opt.value)}
                  onSelect={select}
                  className={styles.optionRow()}
                />
              ))}

              {visibleItems === 0 && <div className={styles.emptyState()}>No matches</div>}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function OptionRow({
  option,
  selected,
  onSelect,
  className,
}: {
  option: DropdownOption;
  selected: boolean;
  onSelect: (value: string) => void;
  className?: string;
}) {
  return (
    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onSelect(option.value)} className={className}>
      <span className="w-4">{selected && <Icon icon="check" size="sm" />}</span>
      {option.label}
    </button>
  );
}

/**
 * Since this component is essentially 4 different components
 * wrapped into one, we define this config to compile all sources
 * of determining which variant to use, and then which subcomponents
 * to render.
 *
 * @param props DropdownProps
 * @returns
 */
function useVariantConfig(props: DropdownProps) {
  const isTypeahead = !!props.typeahead;
  const isMulti = !!props.multiSelect;

  return {
    isTypeahead,
    isMulti,
    showIcon: isTypeahead,
    showChevron: !isTypeahead,
    inputReadOnly: !isTypeahead,
  };
}

/**
 * Typeahead filter function.
 *
 * Shows results that match text directly with priority
 * beginning of string.
 *
 * @param options
 * @param query
 * @returns
 */
function rankAndFilter(options: DropdownOption[], query: string) {
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

/**
 * Does some fancy DOM work to keep the portal
 * next to the input element.
 *
 * @param anchorRef
 * @param open
 * @returns
 */
function useAnchorPosition(anchorRef: React.RefObject<HTMLElement>, open: boolean) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const update = useCallback(() => {
    if (!anchorRef.current) return;
    setRect(anchorRef.current.getBoundingClientRect());
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (open) update();
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
