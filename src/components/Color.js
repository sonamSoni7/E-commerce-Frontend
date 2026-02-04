import React, { useState } from "react";

const Color = ({ colorData, setColor }) => {
  const [selected, setSelected] = useState(null);

  return (
    <ul className="d-flex gap-2 ps-0 mb-0">
      {colorData?.map((item, index) => (
        <li
          key={index}
          role="button"
          onClick={() => {
            setSelected(item?._id);
            setColor(item?._id);
          }}
          className={`list-unstyled rounded-circle d-flex align-items-center justify-content-center border
            ${selected === item?._id ? "border-dark border-2" : "border-secondary"}
          `}
          style={{
            width: "36px",
            height: "36px",
            cursor: "pointer",
          }}
        >
          <span
            className="rounded-circle"
            style={{
              backgroundColor: item?.title,
              width: "24px",
              height: "24px",
              display: "block",
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default Color;
