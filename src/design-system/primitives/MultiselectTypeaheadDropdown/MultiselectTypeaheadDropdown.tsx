"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Icon from "../Icon";
import { MultiselectTypeaheadDropdownProps, multiselectTypeaheadDropdownVariantsCN } from "./variants";

const MAX_VISIBLE_ITEMS = 10;
const ITEM_HEIGHT = 40; // Approximate height per item in pixels

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
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  // Update selected when selectedValues prop changes
  useEffect(() => {
    setSelected(new Set(selectedValues));
  }, [selectedValues]);

  // Calculate popup position
  const updatePopupPosition = useCallback(() => {
    if (isOpen && inputRef.current && containerRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setPopupPosition({
        top: inputRect.bottom,
        left: inputRect.left,
        width: inputRect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    updatePopupPosition();
  }, [updatePopupPosition, searchQuery]);

  // Update position on scroll and resize
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("scroll", updatePopupPosition, true);
      window.addEventListener("resize", updatePopupPosition);
      return () => {
        window.removeEventListener("scroll", updatePopupPosition, true);
        window.removeEventListener("resize", updatePopupPosition);
      };
    }
  }, [isOpen, updatePopupPosition]);

  // Helper function to rank options: those starting with query come first
  const rankOptions = useCallback((optionsToRank: string[], query: string) => {
    if (!query.trim()) {
      return optionsToRank;
    }

    const queryLower = query.toLowerCase();
    return optionsToRank.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      const aStarts = aLower.startsWith(queryLower);
      const bStarts = bLower.startsWith(queryLower);

      // If one starts with query and the other doesn't, prioritize the one that starts
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // If both start with query or both don't, maintain original order
      return 0;
    });
  }, []);

  // Selected options: always show all selected options, regardless of query
  const selectedOptions = useMemo(() => {
    const allSelected = options.filter((option) => selected.has(option));
    // Rank selected options by query match (starts with query first)
    return rankOptions(allSelected, searchQuery);
  }, [options, selected, searchQuery, rankOptions]);

  // Unselected options: filter by query, then rank
  const unselectedOptions = useMemo(() => {
    const unselected = options.filter((option) => !selected.has(option));

    if (!searchQuery.trim()) {
      return unselected;
    }

    const query = searchQuery.toLowerCase();
    const queryRegex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    // Filter unselected options that match the query
    const matchingUnselected = unselected.filter((option) => {
      try {
        return queryRegex.test(option);
      } catch {
        return option.toLowerCase().includes(query);
      }
    });

    // Rank unselected options: those starting with query come first
    return rankOptions(matchingUnselected, searchQuery);
  }, [options, selected, searchQuery, rankOptions]);

  // Combine: selected first, then unselected
  const displayOptions = useMemo(() => {
    return [...selectedOptions, ...unselectedOptions];
  }, [selectedOptions, unselectedOptions]);

  const handleToggle = (option: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(option)) {
      newSelected.delete(option);
    } else {
      newSelected.add(option);
    }
    setSelected(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay closing to allow click events on popup items
    setTimeout(() => {
      // Check if focus moved to the popup or if it's truly outside
      const activeElement = document.activeElement;
      const isFocusInPopup = popupRef.current?.contains(activeElement);
      const isFocusInContainer = containerRef.current?.contains(activeElement);

      if (!isFocusInContainer && !isFocusInPopup) {
        setIsOpen(false);
      }
    }, 200);
  };

  // Close popup when clicking outside (but not when clicking inside popup)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInContainer = containerRef.current?.contains(target);
      const isClickInPopup = popupRef.current?.contains(target);

      // Only close if click is outside both container and popup
      if (!isClickInContainer && !isClickInPopup) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const baseClassName = clsx(multiselectTypeaheadDropdownVariantsCN(props), className);

  const showDivider = selectedOptions.length > 0 && unselectedOptions.length > 0;

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

      {isOpen && popupPosition && (displayOptions.length > 0 || searchQuery.trim().length > 0) && (
        <Popup
          ref={popupRef}
          position={popupPosition}
          selectedOptions={selectedOptions}
          unselectedOptions={unselectedOptions}
          showDivider={showDivider}
          searchQuery={searchQuery}
          onToggle={handleToggle}
          onItemClick={() => {
            // Refocus input after selection to keep popup open
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
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
  searchQuery: string;
  onToggle: (option: string) => void;
  onItemClick: () => void;
}

const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  ({ position, selectedOptions, unselectedOptions, showDivider, searchQuery, onToggle, onItemClick }, ref) => {
    const maxHeight = MAX_VISIBLE_ITEMS * ITEM_HEIGHT;
    const hasNoMatches = searchQuery.trim().length > 0 && unselectedOptions.length === 0;

    const popupContent = (
      <div
        ref={ref}
        className="fixed z-[60] bg-white shadow-lg border-l border-r border-b border-gray-200 overflow-hidden rounded-b-md"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          maxHeight: `${maxHeight}px`,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <div className="overflow-y-auto p-1" style={{ maxHeight: `${maxHeight}px` }}>
          {/* Selected options */}
          {selectedOptions.length > 0 && (
            <>
              {selectedOptions.map((option) => (
                <OptionItem key={option} option={option} isSelected={true} onToggle={onToggle} onItemClick={onItemClick} />
              ))}
              {showDivider && <div className="border-t border-gray-200 my-1" />}
            </>
          )}

          {/* Unselected options */}
          {unselectedOptions.map((option) => (
            <OptionItem key={option} option={option} isSelected={false} onToggle={onToggle} onItemClick={onItemClick} />
          ))}

          {/* No matches message */}
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
    // Prevent input blur when clicking on popup items
    e.preventDefault();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggle(option);
    // Refocus input after selection to keep popup open and allow continued typing
    onItemClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={clsx("w-full px-4 py-2 text-left flex items-center gap-3 transition-colors hover:bg-border rounded-lg")}
    >
      {isSelected && (
        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          <Icon icon="check" size="xs" color="black" />
        </div>
      )}
      {!isSelected && <div className="flex-shrink-0 w-4 h-4" />}
      <span className="flex-1">{option}</span>
    </button>
  );
}
