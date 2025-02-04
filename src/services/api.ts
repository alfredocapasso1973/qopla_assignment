import { Category, AddonGroup } from "../types";

const getCategories = async (): Promise<Category[]> => {
    return [
        {
            id: "1",
            name: "Drinks",
            products: [
                {
                    id: "p1",
                    name: "Soda",
                    price: 75,
                    modifications: {
                        sizes: [
                            { name: "Normal", addonPrice: 0, selected: false },
                            { name: "Extra Large", addonPrice: 15, selected: false },
                        ],
                        flavors: [
                            { name: "Coca Cola", addonPrice: 0, selected: false },
                            { name: "Fanta", addonPrice: 0, selected: false },
                            { name: "Sprite", addonPrice: 0, selected: false },
                        ],
                    },
                },
                {
                    id: "p6",
                    name: "Water Bottle",
                    price: 30,
                    modifications: {
                        sizes: [],
                        flavors: [],
                    },
                },
                {
                    id: "p7",
                    name: "Orange Juice",
                    price: 45,
                    modifications: {
                        sizes: [
                            { name: "Small", addonPrice: 0, selected: false },
                            { name: "Large", addonPrice: 10, selected: false },
                        ],
                        flavors: [],
                    },
                },
                {
                    id: "p8",
                    name: "Lemonade",
                    price: 50,
                    modifications: {
                        sizes: [
                            { name: "Regular", addonPrice: 0, selected: false },
                            { name: "Extra Cold", addonPrice: 5, selected: false },
                        ],
                        flavors: [],
                    },
                },
                {
                    id: "p9",
                    name: "Iced Tea",
                    price: 55,
                    modifications: {
                        sizes: [
                            { name: "Small", addonPrice: 0, selected: false },
                            { name: "Medium", addonPrice: 5, selected: false },
                            { name: "Large", addonPrice: 10, selected: false },
                        ],
                        flavors: [
                            { name: "Lemon", addonPrice: 0, selected: false },
                            { name: "Peach", addonPrice: 0, selected: false },
                        ],
                    },
                },
                {
                    id: "p10",
                    name: "Milkshake",
                    price: 55,
                    modifications: {
                        sizes: [
                            { name: "Small", addonPrice: 0, selected: false },
                            { name: "Medium", addonPrice: 5, selected: false },
                        ],
                        flavors: [
                            { name: "Lemon", addonPrice: 0, selected: false },
                            { name: "Peach", addonPrice: 0, selected: false },
                        ],
                    },
                }
            ],
            selected: false,
        },
        {
            id: "2",
            name: "Burgers",
            products: [
                {
                    id: "p2",
                    name: "Cheeseburger",
                    price: 120,
                    modifications: {
                        sizes: [
                            { name: "Regular", addonPrice: 0, selected: false },
                            { name: "Double", addonPrice: 25, selected: false },
                        ],
                        flavors: [],
                    },
                },
                {
                    id: "p3",
                    name: "Vegan Burger",
                    price: 110,
                    modifications: {
                        sizes: [
                            { name: "Regular", addonPrice: 0, selected: false },
                            { name: "Double", addonPrice: 20, selected: false },
                        ],
                        flavors: [],
                    },
                },
            ],
            selected: false,
        },
        {
            id: "3",
            name: "Desserts",
            products: [
                {
                    id: "p4",
                    name: "Chocolate Cake",
                    price: 90,
                    modifications: {
                        sizes: [],
                        flavors: [
                            { name: "Dark Chocolate", addonPrice: 0, selected: false },
                            { name: "Milk Chocolate", addonPrice: 0, selected: false },
                        ],
                    },
                },
                {
                    id: "p5",
                    name: "Ice Cream",
                    price: 50,
                    modifications: {
                        sizes: [],
                        flavors: [
                            { name: "Vanilla", addonPrice: 0, selected: false },
                            { name: "Strawberry", addonPrice: 0, selected: false },
                            { name: "Chocolate", addonPrice: 0, selected: false },
                        ],
                    },
                },
            ],
            selected: false,
        }
    ];
};

const getAddonGroups = async (): Promise<AddonGroup[]> => {
    return [
        {
            name: "Extra toppings",
            limit: 2,
            sortOrder: 1,
            refProductIds: ["p1", "p2", "p4"],
            addons: [
                {
                    addon: { name: "Whipped cream", price: 15, selected: 0 },
                    limit: 1,
                    sortOrder: 2,
                },
                {
                    addon: { name: "Vanilla ice cream", price: 5, selected: 0 },
                    limit: 1,
                    sortOrder: 0,
                },
                {
                    addon: { name: "Marshmallow", price: 10, selected: 0 },
                    limit: 1,
                    sortOrder: 1,
                },
            ],
        },
    ];
};

export { getCategories, getAddonGroups };
