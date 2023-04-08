import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeToDarkMode,
  ChangeToLightMode,
  inputOnChange,
} from "../ReduxSlicer/ThemePickerSlicer";
import { motion, useAnimation } from "framer-motion";

function ThemeSelector() {
  const { backGroundColor,cardColor, color } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [isThemeOpen,setIsThemeOpen] = useState(false);
  return (
    <motion.div
      initial={{ right: -210 }}
      animate={{right:isThemeOpen?0:-210}}
      className="absolute top-0 right-0"
    >
      <div className="flex">
        <div
            onClick={()=>{
               setIsThemeOpen(!isThemeOpen)
            }}
          style={{ backgroundColor: cardColor }}
          className="border border-1 border-solid border-black p-2 h-fit rounded-s-lg  theme_ico"
        >
          <AiFillSetting className="setting_ico" size={25} />
        </div>
        <div
          style={{ backgroundColor: cardColor }}
          className="p-2"
        >
          <h3>Pick Theme</h3>
          <div>
            <span>Background Color: </span>
            <input
              type="color"
              value={backGroundColor}
              onChange={(e) => {
                dispatch(inputOnChange({ type: "bg", bg: e.target.value }));
              }}
            />
          </div>
          <div>
            <span>Text Color: </span>
            <input
              type="color"
              value={color}
              onChange={(e) => {
                dispatch(inputOnChange({ type: "cl", cl: e.target.value }));
              }}
            />
          </div>
          <div>
            <div>
              <span>Light Theme</span>
              <div
                onClick={() => {
                  dispatch(ChangeToLightMode());
                }}
                className="w-5 h-5 cursor-pointer bg-white rounded-full border"
                type="text"
              ></div>
            </div>
            <div>
              <span>Dark Theme</span>
              <div
                onClick={() => {
                  dispatch(ChangeToDarkMode());
                }}
                className="w-5 h-5 cursor-pointer bg-black rounded-full border"
                type="text"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ThemeSelector;
