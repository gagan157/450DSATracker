import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isCompleted } from "../ReduxSlicer/DsSlicer";

function DsList() {
  const { state } = useLocation();
  const listDs = useSelector((state) => state.dsName.dsList);
  const dispatch = useDispatch();
  const {mode, cardColor } = useSelector((state) => state.theme);
  return (
    <div className="w-full min-h-screen px-5">   
    
      <h1 className="text-3xl font-bold text-center py-5">{state.name}</h1>
      <table className="w-4/5 m-auto">
        <thead >
          <tr className="text-left ">
            <th>Id</th>
            <th>Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Checked</th>
          </tr>
        </thead>
        <tbody>
          {listDs
            .filter((obj) => {
              return Object.keys(obj)[0] === state.name;
            })
            .map((obj) => Object.values(obj))
            .flat(2)
            .map((item, idx) => {
              return (
                <tr key={"item" + idx} className='even:bg-slate-100 odd:bg-slate-200' style={{backgroundColor:mode==='dark' && cardColor}}>
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{item.qname}</td>
                  <td className="text-center p-2">{item.checked?'Complete':'Not Complete'}</td>
                  <td className="text-center p-2">
                    <input type="checkbox" checked={item.checked} onChange={(e)=>{dispatch(isCompleted({id:idx+1, name:state.name, checked:e.target.checked}))}}/>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default DsList;
