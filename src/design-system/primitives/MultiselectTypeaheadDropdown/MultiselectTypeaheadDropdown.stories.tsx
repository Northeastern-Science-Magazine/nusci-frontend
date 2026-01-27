import type { Meta, StoryObj } from "@storybook/react";
import { MultiselectTypeaheadDropdown } from "./MultiselectTypeaheadDropdown";
import React, { useState } from "react";

const variants = ["outline", "filled"] as const;
const sizes = ["lg", "md", "sm"] as const;
const colors = [
  "black",
  "white",
  "red",
  "aqua",
  "aqua-light",
  "forest-green",
  "sage-green",
  "border",
  "neutral",
  "purple",
  "pink",
  "maroon",
  "coral",
  "marigold",
] as const;

// Sample options for stories
const countryOptions = [
  "Canada",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const fruitOptions = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Date",
  "Dragonfruit",
  "Durian",
  "Fig",
  "Grape",
  "Grapefruit",
  "Guava",
  "Kiwi",
  "Lemon",
  "Lime",
  "Lychee",
  "Mango",
  "Melon",
  "Nectarine",
  "Orange",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Pineapple",
  "Plum",
  "Pomegranate",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Watermelon",
];

/** Define the control fields for Storybook */
const meta: Meta<typeof MultiselectTypeaheadDropdown> = {
  component: MultiselectTypeaheadDropdown,
  title: "Primitives/MultiselectTypeaheadDropdown",
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MultiselectTypeaheadDropdown>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    placeholder: "Search countries...",
    options: countryOptions,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="max-w-md">
        <MultiselectTypeaheadDropdown {...args} selectedValues={selected} onSelectionChange={setSelected} />
        {selected.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Selected ({selected.length}):</p>
            <div className="flex flex-wrap gap-2">
              {selected.map((item) => (
                <span key={item} className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

/** Story for Outline Variant */
export const Outline: Story = {
  args: {
    placeholder: "Search...",
    options: countryOptions,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="max-w-md">
        <MultiselectTypeaheadDropdown {...args} selectedValues={selected} onSelectionChange={setSelected} />
      </div>
    );
  },
};

/** Story for Filled Variant */
export const Filled: Story = {
  args: {
    placeholder: "Search...",
    options: countryOptions,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="max-w-md">
        <MultiselectTypeaheadDropdown {...args} selectedValues={selected} onSelectionChange={setSelected} />
      </div>
    );
  },
};

/** Story demonstrating functionality with pre-selected values */
export const WithPreselected: Story = {
  args: {
    placeholder: "Search countries...",
    options: countryOptions,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(["Canada", "United States", "United Kingdom"]);
    return (
      <div className="max-w-md">
        <MultiselectTypeaheadDropdown {...args} selectedValues={selected} onSelectionChange={setSelected} />
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Selected ({selected.length}):</p>
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <span key={item} className="px-2 py-1 bg-gray-100 rounded text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/** Story demonstrating search functionality */
export const SearchFunctionality: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="max-w-md space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Try searching for countries:</h3>
          <p className="text-sm text-gray-600 mb-4">Type "Can" to see Canada, Cameroon, Central African Republic, etc.</p>
          <MultiselectTypeaheadDropdown
            placeholder="Search countries..."
            options={countryOptions}
            selectedValues={selected}
            onSelectionChange={setSelected}
          />
        </div>
        {selected.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Selected ({selected.length}):</p>
            <div className="flex flex-wrap gap-2">
              {selected.map((item) => (
                <span key={item} className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

/** Story demonstrating different option sets */
export const DifferentOptions: Story = {
  render: () => {
    const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-2">Fruits</h3>
          <MultiselectTypeaheadDropdown
            placeholder="Search fruits..."
            options={fruitOptions}
            selectedValues={selectedFruits}
            onSelectionChange={setSelectedFruits}
          />
          {selectedFruits.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Selected: {selectedFruits.join(", ")}</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Countries</h3>
          <MultiselectTypeaheadDropdown
            placeholder="Search countries..."
            options={countryOptions}
            selectedValues={selectedCountries}
            onSelectionChange={setSelectedCountries}
          />
          {selectedCountries.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Selected: {selectedCountries.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    );
  },
};

/** Gallery Item Component */
const GalleryItem = ({
  size,
  color,
  variant,
}: {
  size: (typeof sizes)[number];
  color: (typeof colors)[number];
  variant: (typeof variants)[number];
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <MultiselectTypeaheadDropdown
      placeholder={`${size} | ${variant} | ${color}`}
      options={fruitOptions.slice(0, 20)}
      selectedValues={selected}
      onSelectionChange={setSelected}
    />
  );
};

/** Gallery Story for all MultiselectTypeaheadDropdown Variants */
export const Gallery: Story = {
  args: {},
  render: () => {
    return (
      <div className="space-y-8">
        {colors.map((color) => {
          const isWhite = color === "white";
          return (
            <div key={color} className={isWhite ? "bg-zinc-300 p-4 rounded" : ""}>
              <h2 className="text-xl font-bold mb-4 capitalize">{color}</h2>
              <div className="grid grid-cols-2 gap-4">
                {variants.map((variant) => (
                  <div key={variant} className="space-y-2">
                    <h3 className="font-medium capitalize">{variant}</h3>
                    {sizes.map((size) => (
                      <div key={`${variant}-${size}-${color}`}>
                        <GalleryItem size={size} color={color} variant={variant} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

/** Story demonstrating all sizes */
export const AllSizes: Story = {
  render: () => {
    const [selectedSm, setSelectedSm] = useState<string[]>([]);
    const [selectedMd, setSelectedMd] = useState<string[]>([]);
    const [selectedLg, setSelectedLg] = useState<string[]>([]);
    return (
      <div className="space-y-4 max-w-md">
        <div>
          <h3 className="text-sm font-medium mb-2">Small</h3>
          <MultiselectTypeaheadDropdown
            placeholder="Search..."
            options={fruitOptions}
            selectedValues={selectedSm}
            onSelectionChange={setSelectedSm}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Medium</h3>
          <MultiselectTypeaheadDropdown
            placeholder="Search..."
            options={fruitOptions}
            selectedValues={selectedMd}
            onSelectionChange={setSelectedMd}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Large</h3>
          <MultiselectTypeaheadDropdown
            placeholder="Search..."
            options={fruitOptions}
            selectedValues={selectedLg}
            onSelectionChange={setSelectedLg}
          />
        </div>
      </div>
    );
  },
};

/** Story demonstrating multiselect behavior */
export const MultiselectBehavior: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="space-y-4 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-2">Multiselect Typeahead Dropdown</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select multiple items. Selected items appear at the top with checkmarks. Click a selected item to deselect it.
          </p>
          <MultiselectTypeaheadDropdown
            placeholder="Search and select countries..."
            options={countryOptions}
            selectedValues={selected}
            onSelectionChange={setSelected}
          />
        </div>
        {selected.length > 0 && (
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-sm font-medium mb-2">Selected Items ({selected.length}):</p>
            <div className="flex flex-wrap gap-2">
              {selected.map((item) => (
                <span key={item} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};
