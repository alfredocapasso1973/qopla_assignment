import { useState, useEffect } from "react";
import { getCategories, getAddonGroups } from "../services/api";
import { Category, AddonGroup } from "../types";

export const useAppData = () => {
    const [appData, setAppData] = useState({
        categories: [] as Category[],
        addonGroups: [] as AddonGroup[],
        loading: true,
        error: null as string | null, // New error state
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCategories = await getCategories();
                const fetchedAddonGroups = await getAddonGroups();
                setAppData({ categories: fetchedCategories, addonGroups: fetchedAddonGroups, loading: false, error: null }); // Reset error if successful
            } catch (error) {
                setAppData(prev => ({ ...prev, loading: false, error: "Failed to load data. Please try again later." })); // Show user-friendly error
            }
        };

        fetchData();
    }, []);

    return { appData, setAppData };
};
