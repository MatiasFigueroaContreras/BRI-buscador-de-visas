"use client";

import { useRef, useState } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import SelectedItem from "./SelectedItem";
import OptionsDropdown from "./OptionsDropdown";
import { useMultipleSelect } from "./useMultipleSelect";
import CloseIcon from "../icons/CloseIcon";
import { useClickOutside } from "./useClickOutside";

export type Option = {
    value: string | number;
    label: string;
};

const emptyOptions: Option[] = [];

export default function MultipleSelect({
    options,
    defaultValue = emptyOptions,
    placeholder,
    onChange,
}: {
    options: Option[];
    defaultValue?: Option[];
    placeholder: string;
    onChange: (selectedOptions: Option[]) => void;
}) {
    const boxRef = useClickOutside({
        handler: () => {
            setIsOptionsOpen(false);
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { selected, unselected, addSelected, removeSelected, removeAll } =
        useMultipleSelect(options, defaultValue);

    const handleChangeInput = (event: any) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    const renderSelectedOptions = () => {
        return selected.map((option, index) => (
            <SelectedItem
                key={index}
                option={option}
                onClick={() => onChange(removeSelected(option))}
            />
        ));
    };

    return (
        <div ref={boxRef} className="relative select-none">
            <section
                className="flex pl-2 py-0.5 pr-1 w-full
                           bg-text rounded-md text-sm text-background border
                           hover:cursor-text relative"
            >
                <div
                    className="flex flex-wrap gap-1 grow"
                    onClick={() => {
                        inputRef.current?.focus();
                    }}
                >
                    {renderSelectedOptions()}
                    <input
                        ref={inputRef}
                        className="grow min-w-16 bg-transparent px-1 
                                   focus:outline-none placeholder:text-background"
                        type="text"
                        size={1}
                        onChange={handleChangeInput}
                        placeholder={selected.length == 0 ? placeholder : ""}
                        value={searchValue}
                        onFocus={() => {
                            setIsOptionsOpen(true);
                        }}
                    />
                </div>
                <div className="flex gap-1 items-center justify-items-center">
                    {selected.length != 0 && (
                        <CloseIcon
                            className="w-5 fill-black rounded-lg  
                                    cursor-pointer hover:fill-red"
                            onClick={() => onChange(removeAll())}
                        />
                    )}
                    <ArrowDownIcon
                        className={`w-6 fill-black rounded-lg cursor-pointer
                                    hover:bg-accent hover:fill-white
                                    transition-transform duration-200
                                    ${isOptionsOpen && "rotate-180"}`}
                        onClick={() => {
                            setIsOptionsOpen((prev) => !prev);
                        }}
                    />
                </div>
            </section>
            {isOptionsOpen && (
                <OptionsDropdown
                    options={unselected.filter((option) =>
                        option.label
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                    )}
                    onSelect={(option) => {
                        onChange(addSelected(option));
                        setSearchValue("");
                    }}
                />
            )}
        </div>
    );
}
