import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IOrderProduct} from "@/types/product";

interface IOrderState {
	products: IOrderProduct[] | []
	totalPrice?: number,
	totalQuantity?: number,
}

const initialState: IOrderState  = {
  products: [],
	totalPrice: 0,
	totalQuantity: 0,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IOrderProduct>) => {
			const product = state.products.find(product => product.id === action.payload.id);
			if(!product) {
				state.products = [...state.products, action.payload];
				state.totalPrice = state.products.reduce((total, product) => total + product.price * product.quantity, 0);
				state.totalQuantity = state.products.reduce((total, product) => total + product.quantity, 0);
			}
		},
		removeProduct: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter(product => product.id !== action.payload);
			state.totalPrice = state.products.reduce((total, product) => total + product.price * product.quantity, 0);
			state.totalQuantity = state.products.reduce((total, product) => total + product.quantity, 0);
		},
		changeQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
			const product = state.products.find(product => product.id === action.payload.id);
			if (product) {
				product.quantity = action.payload.quantity;
				state.totalPrice = state.products.reduce((total, product) => total + product.price * product.quantity, 0);
				state.totalQuantity = state.products.reduce((total, product) => total + product.quantity, 0);
			}
		},
		clearOrder: (state) => {
			state.products = [];
			state.totalPrice = 0;
			state.totalQuantity = 0;
		}
  },
})

export const { addProduct, removeProduct, changeQuantity, clearOrder} = orderSlice.actions
export default orderSlice.reducer