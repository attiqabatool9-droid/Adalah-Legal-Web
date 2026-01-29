import React from "react";
import "../../Styles/Matching/MatchTag.css";

const MatchTag = ({ type, text }) => {
  return (
    <span className={`match-tag ${type}`}>
      {text}
    </span>
  );
};

export default MatchTag;
