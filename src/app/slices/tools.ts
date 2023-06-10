import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface IToolsState {
  name: string;
  quantity: number;
  profit: number;
  cost: number;
}

const initialState: Array<IToolsState> = [{
    name: 'Chisel',
    quantity: 0,
    profit: 1,
    cost: 1,
  }, {
    name: 'Flashlight',
    quantity: 0,
    profit: 5,
    cost: 5000,
  }, {
    name: 'Gloves',
    quantity: 0,
    profit: 10,
    cost: 80000,
  }, {
    name: 'Safety glasses',
    quantity: 0,
    profit: 15,
    cost: 200000,
  }, {
    name: 'Helmet',
    quantity: 0,
    profit: 20,
    cost: 600000,
  }, {
    name: 'Hammer',
    quantity: 0,
    profit: 25,
    cost: 1000000,
  }
];

export const toolsSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    update: (state: Array<IToolsState>, action: PayloadAction<{ index: number, quantity: number }>) => {
      const { index, quantity } = action.payload;
      return state.map((tool: IToolsState, i: number ) => {
        if( index === i ) {
          const newQuantity = tool.quantity + quantity;
          return {
            ...tool,
            quantity: newQuantity,
            cost: tool.cost * newQuantity
          };
        }
        return tool;
      });
    },
  }
});

/**
 * @todo Revisar si el quantity efectivamente se actualiza sin duplicar valores (ver si al comprar el primero salen dos después) 
 */

export const { update } = toolsSlice.actions;

export const selectTools = (state: RootState): Array<IToolsState> => state.tool;

export default toolsSlice.reducer;