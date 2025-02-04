import { Product, AddonGroup, Category } from "../types";
import { setProductStateType } from "../hooks/useAppState";

export const handleProductClick = async (
    product: Product,
    cartItems: Product[],
    setProductState: React.Dispatch<React.SetStateAction<{
        selectedProduct: Product | null;
        selectedCategory: Category | null;
        selectedProductForAddons: Product | null;
    }>>,
    addToCart: (product: Product, setCartState: React.Dispatch<React.SetStateAction<{ cartItems: Product[]; isCartOpen: boolean }>>, addonGroups: AddonGroup[]) => Promise<void>,
    setCartState: React.Dispatch<React.SetStateAction<{ cartItems: Product[]; isCartOpen: boolean }>>,
    addonGroups: AddonGroup[]
) => {

    const existingCartItem = cartItems.find(item => item.id === product.id);
    const hasModifications = product.modifications?.sizes.length > 0 || product.modifications?.flavors.length > 0;

    if (!hasModifications) {
        await addToCart(product, setCartState, addonGroups);
        return;
    }

    setProductState(prev => ({ ...prev, selectedProduct: existingCartItem ? { ...existingCartItem } : { ...product } }));

    const bootstrap = await import("bootstrap");
    const modalElement = document.getElementById("productModal");

    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
};


export const handleSelectComplete =  (
    updatedProduct: Product,
    setProductState: setProductStateType,
    setCartState: React.Dispatch<React.SetStateAction<{ cartItems: Product[]; isCartOpen: boolean }>>,
    addonGroups: AddonGroup[]
) => {

    const hasAddons = addonGroups.some(group => group.refProductIds.includes(updatedProduct.id));

    if (hasAddons) {
        setProductState(prev => ({ ...prev, selectedProductForAddons: updatedProduct }));
    } else {
        setCartState(prevCart => ({
            ...prevCart,
            cartItems: prevCart.cartItems.map(item =>
                item.id === updatedProduct.id ? { ...updatedProduct, quantity: item.quantity ?? 1 } : item
            )
        }));
    }

    setTimeout(() => {
        setProductState(prev => ({ ...prev, selectedProduct: null }));
    }, 200);
};
