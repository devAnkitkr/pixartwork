import React from "react";
import "./loading-skeleton.styles.scss";
const LoadingSkeleton = () => {
  return (
    <div className="card-columns ">
      <div className="card border-0 loading " style={{ height: "250px" }}>
        <div className="card-body "></div>
        <h5 className="card-title text-dark "> </h5>
      </div>
      <div className="card border-0 loading" style={{ height: "250px" }}>
        <div className="card-body "></div>
        <h5 className="card-title text-dark "> </h5>
      </div>
      <div className="card border-0 loading " style={{ height: "250px" }}>
        <div className="card-body "></div>
        <h5 className="card-title text-dark "> </h5>
      </div>
      <div className="card border-0 loading  " style={{ height: "250px" }}>
        <div className="card-body "></div>
        <h5 className="card-title text-dark "> </h5>
      </div>
      <div className="card border-0 loading " style={{ height: "250px" }}>
        <div className="card-body "></div>
        <h5 className="card-title text-dark "> </h5>
      </div>
      <div className="card border-0 loading " style={{ height: "250px" }}>
        <div className="card-body "></div>
        <h5 className="card-title text-dark "> </h5>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
