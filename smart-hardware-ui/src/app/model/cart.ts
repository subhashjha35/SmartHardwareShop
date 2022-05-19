export type Cart = {
	id: number; // User id
	products: CartProduct[];
};

export type CartProduct = {
	id: number;
	quantity: number;
};
