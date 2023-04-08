import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../../question";

const createState = () => {
  let listArray = [];
  let prev = { Array: [] };
  for (let { Column1, QuestionsbyLoveBabbar } of data) {
    if (Column1 === Object.keys(prev)[0]) {
      prev[Column1].push({ qname: QuestionsbyLoveBabbar, checked: false });
    } else {
      listArray.push(prev);
      prev = { [Column1]: [] };
    }
  }
  listArray.push(prev);

  return listArray;
};

const initialState = {
  dsList: createState(),
  totalChecked: {},
};

const DsSlicer = createSlice({
  name: "DSName",
  initialState,
  reducers: {
    isCompleted: (state, action) => {
      return {
        ...state,
        dsList: state.dsList.map((obj) => {
          if (Object.keys(obj)[0] === action.payload.name) {
            let arr = obj[action.payload.name];
            let narr = [...arr].map((item, idx) => {
              if (idx + 1 === action.payload.id) {
                return { ...item, checked: action.payload.checked };
              } else {
                return item;
              }
            });

            return { [action.payload.name]: narr };
          } else {
            return obj;
          }
        }),
        totalChecked: Object.keys(state.totalChecked).includes(
          action.payload.name
        )
          ? {
              ...state.totalChecked,
              [action.payload.name]: action.payload.checked
                ? state.totalChecked[action.payload.name] + 1
                : state.totalChecked[action.payload.name] - 1,
            }
          : {
              ...state.totalChecked,
              [action.payload.name]: 1,
            },
      };
    },
  },
});

export const { isCompleted } = DsSlicer.actions;
export default DsSlicer.reducer;
