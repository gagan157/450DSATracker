import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CardDS({ name, cardidx ,listlength }) {
  const { cardColor } = useSelector((state) => state.theme);
  const { totalChecked } = useSelector((state) => state.dsName);
  const navigate = useNavigate();

  const calProgressBar = Math.ceil(100 / listlength);
  const progressWidth = calProgressBar * totalChecked[name];
  return (
    <div
      onClick={() => {
        navigate(`/${name.replace(name, name.split(" ").join("-"))}`, {
          state: { name: name,cardidx },
        });
      }}
      className="p-4 card-flex-basis flex-shrink flex-grow  rounded-lg cursor-pointer shadow-md"
      style={{ backgroundColor: cardColor }}
    >
      <h2 className="font-bold text-lg">{name}</h2>
      <div>
        Total Questions: <span className="font-semibold">{listlength}</span>{" "}
      </div>
     
      {!totalChecked[name] && (
        <span className="text-red-500">Not yet Started</span>
      )}
      {totalChecked[name] > 0 && (
        <div className="bg-slate-300 w-full h-5 rounded-lg relative mt-3">
          <div className="absolute h-fit right-3 top-0 bottom-0 m-auto">
            {totalChecked[name]}/{listlength}
          </div>
          <div
            style={{
              width: `${progressWidth > 100 ? 100 : progressWidth}%`,
            }}
            className={`w-0 h-full ${
              progressWidth <= 20
                ? "bg-red-600"
                : progressWidth <= 40
                ? "bg-orange-600"
                : progressWidth <= 60
                ? "bg-yellow-500"
                : progressWidth <= 80
                ? "bg-green-300"
                : progressWidth <= 99
                ? "bg-green-400"
                : "bg-green-700"
            } rounded-lg`}
          ></div>
        </div>
      )}
    </div>
  );
}

export default CardDS;
