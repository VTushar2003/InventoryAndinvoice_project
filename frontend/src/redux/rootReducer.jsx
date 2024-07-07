import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import toast from "react-hot-toast";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Async Thunks
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      const response = await productService.createProduct(formData);
      return response.data; // Assuming productService returns { data: {...} }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message); // Log the error for debugging
      return thunkAPI.rejectWithValue(message); // Pass error message to Redux
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getProducts();
      return response; // Assuming productService returns { data: [...] }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error('Error fetching products:', message); // Log the error for debugging
      return thunkAPI.rejectWithValue(message); // Pass error message to Redux
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId, thunkAPI) => {
    try {
      await productService.deleteProduct(productId);
      return productId; // Return productId if deletion is successful
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message); // Log the error for debugging
      return thunkAPI.rejectWithValue(message); // Pass error message to Redux
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.getProduct(productId);
      return response; // Assuming productService returns { data: {...} }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message); // Log the error for debugging
      return thunkAPI.rejectWithValue(message); // Pass error message to Redux
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data, thunkAPI) => {
    debugger;
    try {
      const {productId, formData} = data;
      const response = await productService.updateProduct(productId,formData);
      return response.data; // Assuming productService returns { data: {...} }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message); // Log the error for debugging
      return thunkAPI.rejectWithValue(message); // Pass error message to Redux
    }
  }
);

// Slice Definition
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload || [];
      state.totalStoreValue = products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload || [];
      state.outOfStock = products.reduce((count, item) => {
        return count + (item.quantity === 0 ? 1 : 0);
      }, 0);
    },
    CALC_CATEGORY(state, action) {
      const products = action.payload || [];
      state.category = [...new Set(products.map((item) => item.category))];
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending Cases
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      // Fulfilled Cases
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = state.products ? [...state.products, action.payload] : [action.payload];
        toast.success("Product added successfully");
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products ? state.products.filter(
          (product) => product.productId !== action.payload
        ) : [];
        toast.success("Product deleted successfully");
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = JSON.stringify(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
        // Update product in state
       /*  const updatedProductIndex = state.products.find(product => product.productId === action.payload.productId);
        if (updatedProductIndex !== -1) {
          state.products[updatedProductIndex] = action.payload;
        } */
      })
      // Rejected Cases
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export Reducer and Actions
export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } = productSlice.actions;
export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;
