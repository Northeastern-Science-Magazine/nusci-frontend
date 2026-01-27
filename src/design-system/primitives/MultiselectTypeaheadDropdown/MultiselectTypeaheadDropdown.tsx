"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Icon from "../Icon";
import { MultiselectTypeaheadDropdownProps, multiselectTypeaheadDropdownVariantsCN } from "./variants";

/**
 * Dropdown
 * Multiselect Dropdown
 *
 * Typeahead Dropdown
 * Multiselect Typeahead Dropdown
 */

const MAX_VISIBLE_ITEMS = 10;
const ITEM_HEIGHT = 40;
const BLUR_DELAY = 200;

export function MultiselectTypeaheadDropdown({
  className,
  placeholder = "Search...",
  options,
  selectedValues = [],
  onSelectionChange,
  ...props
}: MultiselectTypeaheadDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedValues));
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Sync selected state with prop changes
  useEffect(() => {
    setSelected(new Set(selectedValues));
  }, [selectedValues]);

  // Calculate and update popup position
  const updatePopupPosition = useCallback(() => {
    if (!isOpen || !inputRef.current) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    setPopupPosition({
      top: inputRect.bottom,
      left: inputRect.left,
      width: inputRect.width,
    });
  }, [isOpen]);

  useEffect(() => {
    updatePopupPosition();
  }, [updatePopupPosition, searchQuery]);

  // Update position on scroll and resize
  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("scroll", updatePopupPosition, true);
    window.addEventListener("resize", updatePopupPosition);

    return () => {
      window.removeEventListener("scroll", updatePopupPosition, true);
      window.removeEventListener("resize", updatePopupPosition);
    };
  }, [isOpen, updatePopupPosition]);

  // Rank options: prioritize items starting with query
  const rankOptions = useCallback((optionsToRank: string[], query: string) => {
    if (!query.trim()) return optionsToRank;

    const queryLower = query.toLowerCase();
    return [...optionsToRank].sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(queryLower);
      const bStarts = b.toLowerCase().startsWith(queryLower);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }, []);

  // Filter options by query (case-insensitive regex)
  const filterByQuery = useCallback((optionsToFilter: string[], query: string) => {
    if (!query.trim()) return optionsToFilter;

    const queryLower = query.toLowerCase();
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    try {
      const regex = new RegExp(escapedQuery, "i");
      return optionsToFilter.filter((option) => regex.test(option));
    } catch {
      return optionsToFilter.filter((option) => option.toLowerCase().includes(queryLower));
    }
  }, []);

  // Selected options: always visible, ranked by query
  const selectedOptions = useMemo(() => {
    const allSelected = options.filter((option) => selected.has(option));
    return rankOptions(allSelected, searchQuery);
  }, [options, selected, searchQuery, rankOptions]);

  // Unselected options: filtered and ranked by query
  const unselectedOptions = useMemo(() => {
    const unselected = options.filter((option) => !selected.has(option));
    const filtered = filterByQuery(unselected, searchQuery);
    return rankOptions(filtered, searchQuery);
  }, [options, selected, searchQuery, filterByQuery, rankOptions]);

  const showDivider = selectedOptions.length > 0 && unselectedOptions.length > 0;
  const hasNoMatches = searchQuery.trim().length > 0 && unselectedOptions.length === 0;
  const shouldShowPopup =
    isOpen && popupPosition && (selectedOptions.length > 0 || unselectedOptions.length > 0 || searchQuery.trim().length > 0);

  // Handlers
  const handleToggle = useCallback(
    (option: string) => {
      const newSelected = new Set(selected);
      if (newSelected.has(option)) {
        newSelected.delete(option);
      } else {
        newSelected.add(option);
      }
      setSelected(newSelected);
      onSelectionChange?.(Array.from(newSelected));
    },
    [selected, onSelectionChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => setIsOpen(true);

  const handleInputBlur = () => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isFocusInPopup = popupRef.current?.contains(activeElement);
      const isFocusInContainer = containerRef.current?.contains(activeElement);

      if (!isFocusInContainer && !isFocusInPopup) {
        setIsOpen(false);
      }
    }, BLUR_DELAY);
  };

  const handleItemClick = useCallback(() => {
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  // Close popup on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInside = containerRef.current?.contains(target) || popupRef.current?.contains(target);

      if (!isClickInside) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const baseClassName = clsx(multiselectTypeaheadDropdownVariantsCN(props), className);

  return (
    <div ref={containerRef} className="relative w-full" data-multiselect-container>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={clsx(baseClassName, "w-full pr-10", isOpen && "rounded-b-none")}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon icon="search" size="xs" />
        </div>
      </div>

      {shouldShowPopup && (
        <Popup
          ref={popupRef}
          position={popupPosition!}
          selectedOptions={selectedOptions}
          unselectedOptions={unselectedOptions}
          showDivider={showDivider}
          hasNoMatches={hasNoMatches}
          onToggle={handleToggle}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
}

interface PopupProps {
  position: { top: number; left: number; width: number };
  selectedOptions: string[];
  unselectedOptions: string[];
  showDivider: boolean;
  hasNoMatches: boolean;
  onToggle: (option: string) => void;
  onItemClick: () => void;
}

const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  ({ position, selectedOptions, unselectedOptions, showDivider, hasNoMatches, onToggle, onItemClick }, ref) => {
    const maxHeight = MAX_VISIBLE_ITEMS * ITEM_HEIGHT;

    const popupContent = (
      <div
        ref={ref}
        className="fixed z-[60] bg-white shadow-lg rounded-b-md overflow-hidden border border-neutral"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          maxHeight: `${maxHeight}px`,
        }}
      >
        <div className="overflow-y-auto p-1" style={{ maxHeight: `${maxHeight}px` }}>
          {selectedOptions.length > 0 && (
            <>
              {selectedOptions.map((option) => (
                <OptionItem key={option} option={option} isSelected onToggle={onToggle} onItemClick={onItemClick} />
              ))}
              {showDivider && <div className="border-t border-gray-200 my-1" />}
            </>
          )}

          {unselectedOptions.map((option) => (
            <OptionItem key={option} option={option} isSelected={false} onToggle={onToggle} onItemClick={onItemClick} />
          ))}

          {hasNoMatches && <div className="px-4 py-3 text-sm text-gray-500 text-center border-t border-gray-200">No matches</div>}
        </div>
      </div>
    );

    return typeof window !== "undefined" ? createPortal(popupContent, document.body) : null;
  }
);

Popup.displayName = "Popup";

interface OptionItemProps {
  option: string;
  isSelected: boolean;
  onToggle: (option: string) => void;
  onItemClick: () => void;
}

function OptionItem({ option, isSelected, onToggle, onItemClick }: OptionItemProps) {
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent input blur
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggle(option);
    onItemClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className="w-full px-4 py-2 text-left flex items-center gap-3 transition-colors hover:bg-border rounded-lg"
    >
      <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
        {isSelected && <Icon icon="check" size="xs" color="black" />}
      </div>
      <span className="flex-1">{option}</span>
    </button>
  );
}
