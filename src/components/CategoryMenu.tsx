import React from "react";
import { Category } from "../types";

interface Props {
    categories: Category[];
    loading: boolean;
    onCategorySelect: (category: Category) => void;
}

const CategoryMenu: React.FC<Props> = ({ categories, loading, onCategorySelect }) => {
    return (
        <div>
            {loading ? (
                <div>Loading categories...</div>
            ) : (
                categories.map((category) => (
                    <div key={category.id} className="p-2 g-col-12">
                        <button
                            onClick={() => onCategorySelect(category)}
                            type="button"
                            className={`btn ${category.selected ? 'btn-success' : 'menu_bg_btn'} fw-bold w-100 pt-4 pb-4`}
                            style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
                            {category.name}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryMenu;