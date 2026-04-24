import React from "react";
import CouponsC from "../components/CouponsC";
import { useParams } from "react-router-dom";

function Coupons() {
  const { slug } = useParams();
  return (
    <>
      <CouponsC slug={slug} />
    </>
  );
}

export default Coupons;
