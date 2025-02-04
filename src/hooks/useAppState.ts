import { useState } from "react";
import { Product, Category } from "../types";

export type setProductStateType = React.Dispatch<React.SetStateAction<{
    selectedCategory: Category | null;
    selectedProduct: Product | null;
    selectedProductForAddons: Product | null;
}>>;
export const useAppState = () => {
    const [cartState, setCartState] = useState({
        cartItems: [] as Product[],
        isCartOpen: false
    });

    const [productState, setProductState] = useState({
        selectedCategory: null as Category | null,
        selectedProduct: null as Product | null,
        selectedProductForAddons: null as Product | null
    });

    return { cartState, setCartState, productState, setProductState };
};
