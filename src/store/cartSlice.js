import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItemAmount: 0,
  isShown: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let existingItem = false;
      let existingItemIndex;
      if (state.items) {
        existingItemIndex = state.items.findIndex((item) => {
          return item.id === action.payload.id;
        });
        existingItem = state.items[existingItemIndex];
      }
      if (!existingItem) {
        state.items.push({
          id: action.payload.id,
          selectedAttributes: { ...action.payload.selectedAttributes },
          amount: 1,
        });
        state.totalItemAmount += 1;
      } else if (action.payload.initialAttributes) {
        state.items[existingItemIndex] = {
          ...state.items[existingItemIndex],
          amount: existingItem.amount + 1,
        };
        state.totalItemAmount += 1;
      } else {
        state.items[existingItemIndex] = {
          id: action.payload.id,
          selectedAttributes: { ...action.payload.selectedAttributes },
          amount: existingItem.amount + 1,
        };
        state.totalItemAmount += 1;
      }
    },
    increaseAmount: (state, action) => {
      let existingItemIndex = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.items[existingItemIndex] = {
        ...state.items[existingItemIndex],
        amount: state.items[existingItemIndex].amount + 1,
      };
      state.totalItemAmount += 1;
    },
    removeItem: (state, action) => {
      let existingItemIndex = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (state.items[existingItemIndex].amount === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalItemAmount -= 1;
      } else {
        state.items[existingItemIndex] = {
          ...state.items[existingItemIndex],
          amount: state.items[existingItemIndex].amount - 1,
        };
        state.totalItemAmount -= 1;
      }
    },
    switchAttribute: (state, action) => {
      let existingItemIndex = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.items[existingItemIndex].selectedAttributes = {
        ...state.items[existingItemIndex].selectedAttributes,
        ...action.payload.attribute,
      };
    },
  },
});

export const { addItem, increaseAmount, switchAttribute, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
