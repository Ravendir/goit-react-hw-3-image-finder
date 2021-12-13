import React from "react";
import LoaderImg from "react-loader-spinner";
import slyles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={slyles.spinner}>
      <LoaderImg
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};

export default Loader;
