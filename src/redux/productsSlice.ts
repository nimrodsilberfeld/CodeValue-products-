import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, Product } from "../models/Product";
import { getDateDaysAgos } from "../utils/helpers";

interface ProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  isAddingNewProduct: boolean;
}

const initialState: ProductState = {
  products: [
    new Product("Table", "Nice Table", 100, getDateDaysAgos(2)),
    new Product("Chair", "Nice Chair", 50, getDateDaysAgos(1)),
    new Product("Lamp", "Nice Lamp", 30, getDateDaysAgos(3)),
    new Product("Bed", "Nice Bed", 200, getDateDaysAgos(4)),
    new Product("Sofa", "Nice Sofa", 150, getDateDaysAgos(5)),
    new Product("Desk", "Nice Desk", 120, getDateDaysAgos(6)),
    new Product("Bookshelf", "Nice Bookshelf", 80, getDateDaysAgos(7)),
    new Product("Couch", "Nice Couch", 250, getDateDaysAgos(8)),
  ],
  selectedProduct: null,
  isAddingNewProduct: false,
};

const saveProductsToLocalStorage = (products: IProduct[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAddingProductStatus(state, action: PayloadAction<boolean>) {
      state.isAddingNewProduct = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<IProduct | null>) {
      state.selectedProduct = action.payload;
    },
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
      saveProductsToLocalStorage(action.payload);
    },
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
      saveProductsToLocalStorage(state.products);
    },
    updateProduct(state, action: PayloadAction<IProduct>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {...action.payload,creationDate:new Date()};
      }
      saveProductsToLocalStorage(state.products);
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveProductsToLocalStorage(state.products);
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setSelectedProduct,
  setAddingProductStatus,
} = productSlice.actions;
export default productSlice.reducer;
