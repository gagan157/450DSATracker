import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardDS from "./CardDS";
import { thunkCreateState } from "../ReduxSlicer/DsSlicer";

function Home() {
  const {dsList} = useSelector((state) => state.dsName);
  const dispatch = useDispatch()
  useEffect(()=>{    
    dispatch(thunkCreateState)
  },[])
  return (
    <div className="min-h-screen">   
      <h1 className="text-center text-3xl py-5">450 DSA Tracker</h1>
      <div className="flex flex-wrap justify-center items-center p-3 px-10 gap-5">
        {dsList.length === 0? <h1>Loading....</h1> :dsList.map((obj, idx) => {
          let objkey = Object.keys(obj)[0];
          return (
            <CardDS
              key={objkey + idx}
              cardidx = {idx}
              name={objkey}
              listlength={obj[objkey].length}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
