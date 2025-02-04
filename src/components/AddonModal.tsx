import React, { useEffect, useState } from "react";
import { Product, AddonGroup } from "../types";

interface Props {
    product: Product;
    addonGroups: AddonGroup[];
    onClose: () => void;
    onApplyAddons: (updatedProduct: Product) => void;
}

const AddonModal: React.FC<Props> = ({ product, addonGroups, onClose, onApplyAddons }) => {
    const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});


    useEffect(() => {
        if (product.selectedAddons && Object.keys(product.selectedAddons).length > 0) {
            setSelectedAddons(product.selectedAddons); // Ensures we keep previously selected add-ons
        }
    }, [product]);


    const sortedAddonGroups = addonGroups
        .filter(group => group.refProductIds.includes(product.id))
        .sort((a, b) => a.sortOrder - b.sortOrder);

    useEffect(() => {
        setSelectedAddons(prev => {
            if (product.selectedAddons && Object.keys(product.selectedAddons).length > 0) {
                return product.selectedAddons; // Do not reset selected add-ons
            }

            const initialAddons: Record<string, number> = { ...prev };
            sortedAddonGroups.forEach(group => {
                group.addons.sort((a, b) => a.sortOrder - b.sortOrder).forEach(({ addon }) => {
                    if (!initialAddons[addon.name]) {
                        initialAddons[addon.name] = 0; // Only initialize missing values
                    }
                });
            });

            return initialAddons;
        });
    }, [product, addonGroups]);


    const handleAddonChange = (addonName: string, groupLimit: number, addonLimit?: number) => {
        setSelectedAddons(prev => {
            const currentCount = prev[addonName] || 0;
            let newCount = currentCount > 0 ? 0 : 1; // Toggle: If selected, remove; otherwise, add

            // Ensure we don't exceed the individual add-on limit
            if (addonLimit !== undefined && newCount > addonLimit) {
                console.warn(`Cannot select more than ${addonLimit} of ${addonName}`);
                return prev;
            }

            // Count how many total add-ons are selected in the group
            const selectedCountInGroup = Object.entries(prev)
                .filter(([name]) => sortedAddonGroups.some(group =>
                    group.addons.some(a => a.addon.name === name)
                ))
                .reduce((sum, [, count]) => sum + count, 0);

            // Prevent exceeding group-level limit
            if (selectedCountInGroup >= groupLimit && currentCount === 0) {
                console.warn(`Cannot select more than ${groupLimit} add-ons in this group`);
                return prev;
            }

            // Apply new selection and update state
            const updatedSelection = { ...prev, [addonName]: newCount };
            return updatedSelection;
        });
    };
    const closeModal = () => {
        import("bootstrap").then((bootstrap) => {
            const modalElement = document.getElementById("addonModal");
            if (modalElement) {
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        });

        onClose(); // Call `onClose` to correctly update App.tsx state
    };

    const handleApply = () => {
        const appliedAddons = Object.entries(selectedAddons)
            .filter(([, count]) => count > 0)
            .reduce((acc, [name, count]) => {
                acc[name] = count;
                return acc;
            }, {} as Record<string, number>);

        const updatedProduct = { ...product, selectedAddons: appliedAddons };
        onApplyAddons(updatedProduct);

        closeModal();
    };

    useEffect(() => {
        if (product) {
            import("bootstrap").then((bootstrap) => {
                const modalElement = document.getElementById("addonModal");
                if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                } else {
                    console.log("Add-on modal NOT found in DOM.");
                }
            });
        }
    }, [product]);


    return (
        <div className="modal fade show d-block" id="addonModal" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Extra tillval</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        {sortedAddonGroups.map((group, index) => (
                            <div key={index} className="mb-3">
                                <h5>{group.name} (Max {group.limit})</h5>
                                {group.addons.map(({ addon }) => (
                                    <div key={addon.name} className="d-flex justify-content-between align-items-center">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(selectedAddons[addon.name] && selectedAddons[addon.name] > 0)}
                                            onChange={() => handleAddonChange(addon.name, group.limit, addon.limit)}
                                        />
                                        <span>{addon.name}</span>
                                        <span>{addon.price} kr</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>Clear</button>
                        <button className="btn btn-primary" onClick={handleApply}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddonModal;
