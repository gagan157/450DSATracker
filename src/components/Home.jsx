import React from "react";
import { useSelector } from "react-redux";
import CardDS from "./CardDS";

function Home() {
  const {dsList,totalChecked} = useSelector((state) => state.dsName);
  return (
    <div className="min-h-screen">   
   
      <h1 className="text-center text-3xl py-5">450 DSA Tracker</h1>
      <div className="flex flex-wrap justify-center items-center p-3 px-10 gap-5">
        {dsList.map((obj, idx) => {
          let objkey = Object.keys(obj)[0];
          return (
            <CardDS
              key={objkey + idx}
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
