import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { stringify } from "querystring";
import { RootState, AppThunk } from "../../app/store";
import Pokemon from "../models/pokemon";

export interface PokemonsState {
  pokemons: Pokemon[];
  limit: number;
  offset: number;
}

const initialState: PokemonsState = {
  pokemons: [],
  limit: 20,
  offset: 0,
};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPokemons: (state, action) => {
      state.pokemons.concat(action.payload);
      return {
        ...state,
        pokemons: state.pokemons.concat(action.payload),
        offset: state.offset + state.limit,
      };
    },
  },
});

export const { addPokemons } = pokemonSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPokemons = (state: RootState) => state.pokemons.pokemons;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default pokemonSlice.reducer;
