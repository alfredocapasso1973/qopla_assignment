import React, { Suspense } from "react";
import { useAppData } from "./hooks/useAppData";
import { useAppState } from "./hooks/useAppState";
import { Category, Product} from "./types";
import { addToCart, handleApplyAddonsWrapper, handleEditCartItem } from "./services/cartService";
import {handleProductClick} from "./services/productService";
import ProductList from './components/ProductList';
import SearchForm from './components/SearchForm';
import CategoryMenu from './components/CategoryMenu';
import ProductModal from './components/ProductModal';
import AddonModal from './components/AddonModal';
import Cart from "./components/Cart";
import CartButton from "./components/CartButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./index.css";

const App: React.FC = () => {
    const { appData } = useAppData();
    const { cartState, setCartState, productState, setProductState } = useAppState();



    const handleEditCartItemInApp = (product: Product) => {
        handleEditCartItem(product, setProductState);
    };

    const handleApplyAddonsInApp = (updatedProduct: Product) => {
        const existingCartItem = cartState.cartItems.find(
            (item) =>
                item.id === updatedProduct.id &&
                item.selectedFlavor?.name === updatedProduct.selectedFlavor?.name &&
                item.selectedSize?.name === updatedProduct.selectedSize?.name
        );

        handleApplyAddonsWrapper(updatedProduct, existingCartItem || null, setProductState, setCartState, appData.addonGroups);
    };


    const handleProductClickInApp = (product: Product) => {
        handleProductClick(product, cartState.cartItems, setProductState, addToCart, setCartState, appData.addonGroups);
    };

    const handleSelectCompleteInApp = async (updatedProduct: Product) => {
        const existingCartItem = cartState.cartItems.find(
            (item) =>
                item.id === productState.selectedProduct?.id && // Match by ID
                item.selectedSize?.name === productState.selectedProduct?.selectedSize?.name // Ignore flavor changes
        );

        // Close the Product Modal first
        setProductState(prev => ({
            ...prev,
            selectedProduct: null,
        }));

        setTimeout(async () => {
            // Remove any stuck backdrop from Bootstrap
            document.body.classList.remove("modal-open");
            document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.remove());

            //  Now set the product for the Add-on Modal
            setProductState(prev => ({
                ...prev,
                selectedProductForAddons: updatedProduct,
            }));

            // Open the Add-on Modal after Product Modal fully closes
            setTimeout(async () => {
                const modalElement = document.getElementById("addonModal");
                if (modalElement) {
                    const bootstrap = await import("bootstrap");
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                }
            }, 200);
        }, 300); // Ensure enough delay before opening add-on modal

        handleApplyAddonsWrapper(updatedProduct, existingCartItem || null, setProductState, setCartState, appData.addonGroups);
    };




    const handleCloseAddonModal = () => {
        setProductState(prev => ({ ...prev, selectedProductForAddons: null }));

        setTimeout(() => {
            document.body.classList.remove("modal-open");
            document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.remove());
        }, 300);
    };


    const handleCloseCart = () => {
        setCartState(prev => ({ ...prev, isCartOpen: false }));
    };

    const handleCategorySelect = (category: Category) => {
        setProductState(prev => ({ ...prev, selectedCategory: category }));
    };

    return (
        <>
            {appData.error && (
                <div className="alert alert-danger text-center" role="alert">
                    {appData.error}
                </div>
            )}

            <Navbar />
            <div className="container-fluid d-flex flex-column mt-3">
                {/* Search Bar */}
                <SearchForm />
                <div className="row">
                    {/* Sidebar Category Menu */}
                    <div className="col-auto menu-bg">
                        <div className="category-menu">
                            <CategoryMenu categories={appData.categories} loading={appData.loading} onCategorySelect={handleCategorySelect} />
                        </div>
                    </div>
                    {/* Main Product List */}
                    <div className="col">
                        {productState.selectedCategory ? (
                            <Suspense fallback={<div>Loading products...</div>}>
                                <ProductList products={productState.selectedCategory?.products || []} onProductClick={handleProductClickInApp} />
                            </Suspense>
                        ) : (
                            <div>Select a category to view products</div>
                        )}
                    </div>
                    {/* Cart Button */}
                    <div className="col-auto">
                        <CartButton />
                    </div>
                </div>
            </div>
            {
                productState.selectedProduct &&
                <ProductModal
                    product={productState.selectedProduct}
                    onClose={() => setProductState(prev => ({ ...prev, selectedProduct: null }))}
                    onSelectComplete={handleSelectCompleteInApp} />
            }
            <Cart cartItems={cartState.cartItems} onClose={handleCloseCart} isOpen={cartState.isCartOpen} onEditItem={handleEditCartItemInApp} />

            {productState.selectedProductForAddons && (
                <AddonModal
                    product={productState.selectedProductForAddons}
                    addonGroups={appData.addonGroups}
                    onClose={handleCloseAddonModal}
                    onApplyAddons={handleApplyAddonsInApp}
                />

            )}
            <Footer />
        </>
    );
};

export default App;
