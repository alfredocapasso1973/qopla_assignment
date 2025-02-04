import { Product, AddonGroup, Category } from "../types";
export const addToCart = async (
    product: Product,
    setCartState: React.Dispatch<React.SetStateAction<{ cartItems: Product[]; isCartOpen: boolean }>>,
    addonGroups: AddonGroup[]
) => {
    let totalPrice = product.price;
    if (product.selectedSize) {
        totalPrice += product.selectedSize.addonPrice;
    }
    if (product.selectedAddons) {
        Object.entries(product.selectedAddons).forEach(([addonName, count]) => {
            const addon = addonGroups
                .flatMap(group => group.addons)
                .find(a => a.addon.name === addonName);
            if (addon) {
                totalPrice += addon.addon.price * count;
            }
        });
    }
    product.finalPrice = totalPrice; // Ensure correct price before adding to cart
    setCartState(prev => ({
        ...prev,
        cartItems: prev.cartItems.map((item) =>
            item.id === product.id &&
            item.selectedFlavor?.name === product.selectedFlavor?.name &&
            item.selectedSize?.name === product.selectedSize?.name
                ? { ...item, quantity: (item.quantity ?? 0) + 1, finalPrice: totalPrice } // Update existing
                : item
        ).concat(
            prev.cartItems.some(item =>
                item.id === product.id &&
                item.selectedFlavor?.name === product.selectedFlavor?.name &&
                item.selectedSize?.name === product.selectedSize?.name
            ) ? [] : [{ ...product, quantity: 1 }] // Add new if not found
        ),
        isCartOpen: true // Automatically open the cart after adding an item
    }));
    const bootstrap = await import("bootstrap");
    const cartElement = document.getElementById("offcanvasExample");
    if (cartElement) {
        const offcanvas = new bootstrap.Offcanvas(cartElement);
        offcanvas.show();
    }
};


export const handleApplyAddons = async (
    updatedProduct: Product,
    originalProduct: Product | null, // Now correctly tracks the original item
    setProductState: React.Dispatch<React.SetStateAction<{ selectedProductForAddons: Product | null; selectedCategory: Category | null; selectedProduct: Product | null }>>,
    setCartState: React.Dispatch<React.SetStateAction<{ cartItems: Product[]; isCartOpen: boolean }>>,
    addonGroups: AddonGroup[]
) => {
    try {
        let totalPrice = updatedProduct.price;

        if (updatedProduct.selectedSize) {
            totalPrice += updatedProduct.selectedSize.addonPrice;
        }

        if (updatedProduct.selectedAddons) {
            Object.entries(updatedProduct.selectedAddons).forEach(([addonName, count]) => {
                const addon = addonGroups
                    ?.flatMap(group => group.addons)
                    ?.find(a => a.addon.name === addonName);

                if (addon) {
                    totalPrice += addon.addon.price * count;
                } else {
                    console.warn(`⚠️ Warning: Missing add-on data for "${addonName}"`);
                }
            });
        }

        updatedProduct.finalPrice = totalPrice;

        setProductState(prev => ({ ...prev, selectedProductForAddons: null }));

        setTimeout(() => {
            setCartState(prev => {
                const existingItemIndex = prev.cartItems.findIndex(item =>
                    item.id === originalProduct?.id &&
                    item.selectedSize?.name === originalProduct?.selectedSize?.name &&
                    item.selectedFlavor?.name === originalProduct?.selectedFlavor?.name // Now also considers flavor
                );

                if (existingItemIndex !== -1) {
                    const updatedCart = prev.cartItems.map((item, index) =>
                        index === existingItemIndex
                            ? { ...updatedProduct, quantity: item.quantity ?? 1 } // Replace existing item
                            : item
                    );

                    return { ...prev, cartItems: updatedCart, isCartOpen: true };
                } else {
                    return {
                        ...prev,
                        cartItems: [...prev.cartItems, { ...updatedProduct, quantity: 1 }],
                        isCartOpen: true
                    };
                }
            });

            //  Ensure cart opens after update
            setTimeout(async () => {
                const bootstrap = await import("bootstrap");
                const cartElement = document.getElementById("offcanvasExample");
                if (cartElement) {
                    const offcanvas = new bootstrap.Offcanvas(cartElement);
                    offcanvas.show();
                }
            }, 300);
        }, 100);
    } catch (error) {
        alert("Something went wrong while applying add-ons. Please try again.");
    }
};


export const handleEditCartItem = async (
    product: Product,
    setProductState: React.Dispatch<React.SetStateAction<{ selectedProduct: Product | null; selectedCategory: Category | null; selectedProductForAddons: Product | null }>>
) => {

    setProductState(prev => ({ ...prev, selectedProduct: { ...product } })); // Open modification modal with existing selections

    const bootstrap = await import("bootstrap");
    const modalElement = document.getElementById("productModal");

    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
};

export const handleEditCartItemWrapper = async (
    product: Product,
    setProductState: React.Dispatch<React.SetStateAction<{ selectedProduct: Product | null; selectedCategory: Category | null; selectedProductForAddons: Product | null }>>
) => {
    await handleEditCartItem(product, setProductState);
};

export const handleApplyAddonsWrapper = (
    updatedProduct: Product,
    originalProduct: Product | null, // New parameter to track the original item
    setProductState: React.Dispatch<React.SetStateAction<{ selectedProductForAddons: Product | null; selectedCategory: Category | null; selectedProduct: Product | null }>>,
    setCartState: React.Dispatch<React.SetStateAction<{ cartItems: Product[]; isCartOpen: boolean }>>,
    addonGroups: AddonGroup[]
) => {
    handleApplyAddons(updatedProduct, originalProduct, setProductState, setCartState, addonGroups);
};
