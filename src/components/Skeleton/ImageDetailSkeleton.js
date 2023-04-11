import React from "react";
import { Skeleton } from "@mui/material";
const ImageDetailSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rect"
          width={100}
          height={100}
          style={{ display: "inline-block" }}
        />
      ))}
    </>
  );
};

export default ImageDetailSkeleton;
