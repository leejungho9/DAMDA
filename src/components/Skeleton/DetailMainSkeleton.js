import React from "react";
import { Skeleton } from "@mui/material";

const DetailMainSkeleton = () => {
  return (
    <>
      {Array.from({ length: 1 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rect"
          width={600}
          height={600}
          style={{ display: "inline-block" }}
        />
      ))}
    </>
  );
};

export default DetailMainSkeleton;
