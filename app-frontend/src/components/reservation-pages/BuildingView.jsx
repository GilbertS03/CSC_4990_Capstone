import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BuildingView() {
  const { buildingId } = useParams();

  return (
    <>
      <div className="container">
        <div className="row">{`Hello this is building ${buildingId}!`}</div>
      </div>
    </>
  );
}
export default BuildingView;
