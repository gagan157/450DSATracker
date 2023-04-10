import { createSlice } from "@reduxjs/toolkit";
// import { data } from "../../../question";
import ReadDataFirebase,{UpdateDataFirebase} from "../firebase/sendDataToFirebase";

//Send data to firebase onces
// const createState = () => {
//   let listArray = [];
//   let prev = { Array: [] };
//   for (let { Column1, QuestionsbyLoveBabbar } of data) {
//     if (Column1 === Object.keys(prev)[0]) {
//       prev[Column1].push({ qname: QuestionsbyLoveBabbar, checked: false });
//     } else {
//       listArray.push(prev);
//       prev = { [Column1]: [] };
//     }
//   }
//   listArray.push(prev);
  
//   return listArray;
// };




const initialState = {
  dsList: [],
  totalChecked: {},
};

const DsSlicer = createSlice({
  name: "DSName",
  initialState,
  reducers: {
    setdata: (state,action)=>{return {      
      ...state,dsList:action.payload.data,totalChecked:action.payload.totalDsaCompeteCount
    
    }},
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





export const { isCompleted, setdata} = DsSlicer.actions;
export default DsSlicer.reducer;



export async function thunkCreateState(dispatch){  
  let data = await ReadDataFirebase()
  let totalDsaCompeteCount = {}
   data.map((obj)=>{
    let key = Object.keys(obj)[0]
    let length = obj[key].filter(item=> item.checked === true).length
      if(length > 0){
        totalDsaCompeteCount[key] = length
      }
  })
  dispatch(setdata({data:data,totalDsaCompeteCount:totalDsaCompeteCount}))
}

export function thunkUpdateDataFirebase(obj){
  
  UpdateDataFirebase(obj)
 
}