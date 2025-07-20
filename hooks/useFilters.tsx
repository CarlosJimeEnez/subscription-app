import { useState } from "react";
import { FilterOption } from "../interface/filters.interface";

const options: FilterOption[] = [
    { id: 'All', label: 'All' },
    { id: 'Active', label: 'Active', icon: 'checkmark-circle' },
    { id: 'Cancelled', label: 'Cancelled', icon: 'close-circle' },
    { id: 'Monthly', label: 'Monthly', icon: 'calendar' },
    { id: 'Yearly', label: 'Yearly', icon: 'calendar' },
]

export const useFilters = () => {
    const [filterOptions, setFilterOptions] = useState([])
    const [selectedFilter, setLocalSelectedFilter] = useState<string>("All")


    return {
        options,
        selectedFilter,
        filterOptions,

        setLocalSelectedFilter,
        setFilterOptions
    }
}