export type Modification = {
    name: string;
    addonPrice: number;
    selected: boolean;
};

export type Addon = {
    name: string;
    price: number;
    selected: number;
    limit?: number;
};

export type AddonGroup = {
    name: string;
    limit: number;
    sortOrder: number;
    refProductIds: string[];
    addons: { addon: Addon; limit: number; sortOrder: number }[];
};

export type Product = {
    id: string;
    name: string;
    price: number;
    modifications: {
        sizes: Array<Modification>;
        flavors: Array<Modification>;
    };
    selectedSize?: Modification;
    selectedFlavor?: Modification;
    selectedAddons?: Record<string, number>;
    finalPrice?: number;
    quantity?: number;
};

export type Category = {
    id: string;
    name: string;
    products: Array<Product>;
    selected: boolean;
};