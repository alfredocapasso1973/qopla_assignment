import React, { useState, useEffect } from "react";
import { Product, Modification } from "../types";

interface Props {
    product: Product;
    onClose: () => void;
    onSelectComplete: (updatedProduct: Product) => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose, onSelectComplete }) => {
    const [selectedSize, setSelectedSize] = useState<Modification | null>(product.selectedSize || null);
    const [selectedFlavor, setSelectedFlavor] = useState<Modification | null>(product.selectedFlavor || null);

    useEffect(() => {
        // Prefill existing selections when editing from cart
        setSelectedSize(product.selectedSize || null);
        setSelectedFlavor(product.selectedFlavor || null);
    }, [product]);

    const handleSizeSelect = (size: Modification) => {
        setSelectedSize(prevSize => prevSize?.name === size.name ? null : size);
    };

    const handleFlavorSelect = (flavor: Modification) => {
        setSelectedFlavor(prevFlavor => prevFlavor?.name === flavor.name ? null : flavor);
    };

    const handleConfirmSelection = () => {
        if (selectedSize && selectedFlavor) {
            const updatedProduct = { ...product, selectedSize, selectedFlavor };
            onSelectComplete(updatedProduct);
            onClose(); // Close the modal after saving
        } else {
            console.warn("Please select both a size and a flavor.");
        }
    };

    return (
        <div className="modal fade" id="productModal" tabIndex={-1} aria-labelledby="productModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title">Anpassa {product.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* Flavors */}
                        <strong>Smaker</strong>
                        <div className="d-flex flex-wrap gap-2">
                            {product.modifications.flavors.map(flavor => (
                                <button
                                    key={flavor.name}
                                    className={`modification-button ${selectedFlavor?.name === flavor.name ? "selected" : ""}`}
                                    onClick={() => handleFlavorSelect(flavor)}
                                >
                                    {flavor.name}
                                </button>
                            ))}
                        </div>
                        <br />

                        {/* Sizes */}
                        <strong>Storlekar</strong>
                        <div className="d-flex flex-wrap gap-2">
                            {product.modifications.sizes.map(size => (
                                <button
                                    key={size.name}
                                    className={`modification-button ${selectedSize?.name === size.name ? "selected" : ""}`}
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size.name} {size.addonPrice > 0 ? `(+${size.addonPrice} kr)` : ""}
                                </button>
                            ))}
                        </div>

                        {/* Save Button */}
                        <div className="mt-3 d-flex justify-content-end">
                            <button className="btn btn-success" onClick={handleConfirmSelection}>
                                Save Selection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProductModal;
