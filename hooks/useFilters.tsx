import { useState } from "react";
import { FilterOption } from "../interface/filters.interface";

const options: FilterOption[] = [
    { id: 'All', label: 'All' },
    { id: 'Active', label: 'Active', icon: 'checkmark-circle' },
    { id: 'Inactive', label: 'Inactive', icon: 'close-circle' },
    { id: 'Monthly', label: 'Monthly', icon: 'calendar' },
    { id: 'Yearly', label: 'Yearly', icon: 'calendar' },
]

export const useFilters = () => {
    const [filterOptions, setFilterOptions] = useState([])
    const [selectedFilter, setSelectedFilter] = useState<string>("All")


    return {
        options,
        selectedFilter,
        filterOptions,

        setSelectedFilter,
        setFilterOptions
    }
}