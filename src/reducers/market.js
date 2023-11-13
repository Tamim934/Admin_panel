import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/Token";

const productsAPI = "http://localhost:3000/api/products"
const categoriesAPI = "http://localhost:3000/api/categories"
const subCategoriesAPI = "http://localhost:3000/api/subCategories"
const brandsAPI = "http://localhost:3000/api/brands"

export const getBrands = createAsyncThunk(
    "brands/getBrands",
    async function(){
        try {
            const { data } = await axiosRequest.get(brandsAPI)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async function () {
      try {
        const { data } = await axiosRequest.get(productsAPI);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  
  export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async function () {
      try {
        const { data } = await axiosRequest.get(categoriesAPI);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  
  export const getSubCategories = createAsyncThunk(
    "subCategories/getSubCategories",
    async function () {
      try {
        const { data } = await axiosRequest.get(subCategoriesAPI);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product) => {
      const formData = new FormData();
      await Promise.all(Object.keys(product).map(async (key) => {
        if (key === 'media' && product[key]) {
          try {
            const base64Image = await FileToBase64(product[key]);
            formData.append('file', base64Image);
          } catch (error) {
            console.error('Error converting file to base64: ', error);
          }
        } else {
          formData.append(key, product[key]);
        }
      }));
  
      try {
        const response = await axiosRequest.post('http://localhost:3000/uploads', formData);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
      }
    }
  );
  
  

  export const market = createSlice({
    name: "market",
    initialState: {
      products: [],
      categories: [],
      subCategories: [],
      brands: []
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBrands.fulfilled, (state, action) => {
          state.brands = action.payload;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.products = action.payload;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.categories = action.payload;
        })
        .addCase(getSubCategories.fulfilled, (state, action) => {
          state.subCategories = action.payload;
        });
    }
  });