import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isCompleted, thunkUpdateDataFirebase } from "../ReduxSlicer/DsSlicer";
import { RxCross2 } from "react-icons/rx";
import { BsFillCheckSquareFill } from "react-icons/bs";

function DsList() {
  const { state } = useLocation();
  const listDs = useSelector((state) => state.dsName.dsList);
  const dispatch = useDispatch();
  const { mode, cardColor } = useSelector((state) => state.theme);
  return (
    <div className="w-full min-h-screen px-5">
      <h1 className="text-3xl font-bold text-center py-5">{state.name}</h1>
      <table className="w-4/5 m-auto">
        <thead>
          <tr className="text-left ">
            <th>Id</th>
            <th>Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Checked</th>
          </tr>
        </thead>
        <tbody>
          {listDs &&
            listDs
              .filter((obj) => {
                return Object.keys(obj)[0] === state.name;
              })
              .map((obj) => Object.values(obj))
              .flat(2)
              .map((item, idx) => {
                return (
                  <tr
                    key={"item" + idx}
                    className="even:bg-slate-100 odd:bg-slate-200"
                    style={{ backgroundColor: mode === "dark" && cardColor }}
                  >
                    <td className="p-2">{idx + 1}.</td>
                    <td className="p-2 capitalize">{item.qname}</td>
                    <td className="text-center p-2">
                      {item.checked ? (
                        <div className="flex items-center justify-center gap-2">
                        <BsFillCheckSquareFill size={20}  style={{
                              backgroundColor: "white",
                              color: "green",
                              borderRadius: "4px",
                            }}/>
                        Complete
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <RxCross2
                          size={20}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: "5px",
                            }}
                          />
                          Not Complete
                        </div>
                      )}
                    </td>
                    <td className="text-center p-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => {
                          dispatch(
                            isCompleted({
                              id: idx + 1,
                              name: state.name,
                              checked: e.target.checked,
                            })
                          );
                          thunkUpdateDataFirebase({
                            id: idx + 1,
                            cardidx: state.cardidx,
                            name: state.name,
                            checked: e.target.checked,
                          });
                        }}
                      />
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
