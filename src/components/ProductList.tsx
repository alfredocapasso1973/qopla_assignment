import React from "react";
import { Product } from "../types";

interface ProductListProps {
    products: Array<Product>;
    onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {
    return (
        <div className="product-grid">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className={`product-item ${index === 5 ? "product-last" : ""}`}
                >
                    <button
                        onClick={() => onProductClick(product)}
                        className="card d-flex flex-column justify-content-center align-items-center text-center p-3 w-100 border-0 shadow-sm product-button"
                    >
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="card-title mb-2">{product.name}</h5>
                        </div>
                        <hr className="m-0 w-100" />
                        <div className="card-footer bg-white border-0 w-100 text-center">
                            <b>{product.price} kr</b>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
};












export default ProductList;
