import { createSlice } from "@reduxjs/toolkit";
//mode :- light , dark, custome
const initialState = {
  mode: "light",
  backGroundColor: "#ffffff",
  cardColor: "#f8f8f8",
  color: "#000000",
};

const ThemeSlicer = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    ChangeToDarkMode: (state) => {
      return {
        ...state,
        mode: "dark",
        backGroundColor: "#000000",
        cardColor:'#393939',
        color: "#ffffff",
      };
    },
    ChangeToLightMode: (state) => {
      return {
        ...state,
        mode: "light",
        backGroundColor: "#ffffff",
        cardColor:'#f8f8f8',
        color: "#000000",
      };
    },
    inputOnChange: (state, action) => {
      if (action.payload.type === "bg") {
        return {
          ...state,
          mode: "custom",
          backGroundColor: action.payload.bg         
        };
      }
      else if(action.payload.type === "cl"){
        return {
            ...state,
            mode: "custom",            
            color: action.payload.cl,
        };
      }
    },
  },
});

export const { ChangeToDarkMode, ChangeToLightMode, inputOnChange } =
  ThemeSlicer.actions;
export default ThemeSlicer.reducer;
