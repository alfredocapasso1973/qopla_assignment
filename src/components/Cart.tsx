import React, { useEffect } from "react";
import { Product } from "../types";

interface Props {
    cartItems: Product[];
    onClose: () => void;
    isOpen: boolean;
    onEditItem: (item: Product) => void; // New prop to handle editing an item
}

const Cart: React.FC<Props> = ({ cartItems, onClose, isOpen, onEditItem }) => {
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.finalPrice || item.price) * (item.quantity ?? 1),
        0
    );

    useEffect(() => {
        if (isOpen) {
            const openCart = async () => {
                try {
                    const bootstrap = await import("bootstrap");
                    const cartElement = document.getElementById("offcanvasExample");
                    if (cartElement) {
                        const offcanvas = new bootstrap.Offcanvas(cartElement);
                        offcanvas.show();
                    }
                } catch (error) {
                    console.error("Error opening cart:", error);
                }
            };
            openCart();
        }
    }, [isOpen]);

    return (
        <div
            className="offcanvas offcanvas-end cart-container"
            id="offcanvasExample"
            tabIndex={-1}
            aria-labelledby="offcanvasExampleLabel"
            data-bs-backdrop="false"
        >
            {/* Cart Header */}
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Shopping Cart</h5>
                <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            </div>

            {/* Cart Items (Scrollable) */}
            <div className="offcanvas-body cart-body">
                {cartItems.length === 0 ? (
                    <p>No items in the cart</p>
                ) : (
                    <ul className="list-group">
                        {cartItems.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                style={{ cursor: item.modifications?.sizes.length || item.modifications?.flavors.length ? "pointer" : "default" }}
                                onClick={() =>
                                    (item.modifications?.sizes.length || item.modifications?.flavors.length)
                                        ? onEditItem(item)
                                        : null
                                }
                            >
                                <div>
                                    <strong>{item.name}</strong> ({item.quantity}st)
                                    <br />
                                    <div className="ps-2">
                                        <div>
                                            {item.selectedFlavor && (
                                                <small><b>Smak:</b> {item.selectedFlavor.name}</small>
                                            )}
                                        </div>
                                        <div>
                                            {item.selectedSize && (
                                                <small><b>Storlek:</b> {item.selectedSize.name}</small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <span>
                            {(item.finalPrice || item.price) * (item.quantity ?? 1)} kr
                        </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Fixed Cart Footer */}
            <div className="cart-footer">
                {/* Row 1: Toggle + Icons */}
                <div className="cart-footer-row d-flex justify-content-between align-items-center">
                    <div className="toggle-section">
                        <input type="checkbox" id="toggleTakeaway" className="toggle-switch" />
                        <label htmlFor="toggleTakeaway">Take Away</label>
                    </div>
                    <div className="icons-section">
                        <i className="bi bi-calculator text-primary"></i>
                        <i className="bi bi-plus-circle text-success"></i>
                        <i className="bi bi-trash text-danger"></i>
                        <i className="bi bi-gear text-warning"></i>
                        <i className="bi bi-info-circle text-secondary"></i>
                    </div>
                </div>

                {/* Row 2: Tax and Total */}
                <div className="cart-footer-row">
                    <div className="d-flex justify-content-between small text-muted">
                        <span>Moms:</span>
                        <span>{(totalPrice * 0.1).toFixed(2)} kr</span> {/* Assuming 10% tax */}
                    </div>
                    <div className="d-flex justify-content-between total-row">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">{totalPrice} kr</span>
                    </div>
                </div>

                {/* Row 3: Green Kort Section */}
                <div className="cart-footer-row payment-type">
                    <div className="payment-box">Kort</div>
                    <div className="payment-box">Kort</div>
                </div>

                {/* Row 4: Payment Options */}
                <div className="cart-footer-row payment-options d-flex">
                    <div className="payment-option">Swish</div>
                    <div className="payment-option">Kontant</div>
                    <div className="payment-option">Faktura</div>
                    <div className="payment-option">Annat</div>
                </div>
            </div>
        </div>

    );
};

export default Cart;
