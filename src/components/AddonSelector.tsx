import React, { useState } from "react";
import { AddonGroup } from "../types";

interface Props {
    addonGroups: AddonGroup[];
    onSelectionChange: (selectedAddons: Record<string, number>) => void;
}

const AddonSelector: React.FC<Props> = ({ addonGroups, onSelectionChange }) => {
    const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

    const handleIncrement = (addonName: string, groupLimit: number, addonLimit: number) => {
        setSelectedAddons((prev) => {
            const currentCount = prev[addonName] || 0;
            const totalGroupCount = Object.values(prev).reduce((acc, count) => acc + count, 0);

            if (currentCount < addonLimit && totalGroupCount < groupLimit) {
                const newSelection = { ...prev, [addonName]: currentCount + 1 };
                onSelectionChange(newSelection);
                return newSelection;
            }
            return prev;
        });
    };

    const handleDecrement = (addonName: string) => {
        setSelectedAddons((prev) => {
            if (prev[addonName] > 0) {
                const newSelection = { ...prev, [addonName]: prev[addonName] - 1 };
                onSelectionChange(newSelection);
                return newSelection;
            }
            return prev;
        });
    };

    return (
        <div>
            {addonGroups?.length > 0 ? (
                addonGroups.map((group, index) => (
                    <div key={index} className="mb-3">
                        <h5>{group.name} (Max: {group.limit})</h5>
                        {group.addons.map(({ addon, limit }) => (
                            <div key={addon.name} className="d-flex align-items-center justify-content-between">
                                <span>{addon.name} (+{addon.price} kr)</span>
                                <div>
                                    <button className="btn btn-outline-secondary" onClick={() => handleDecrement(addon.name)}>-</button>
                                    <span className="mx-2">{selectedAddons[addon.name] || 0}</span>
                                    <button className="btn btn-outline-primary" onClick={() => handleIncrement(addon.name, group.limit, limit)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>Loading add-ons...</p>
            )}
        </div>
    );
};

export default AddonSelector;