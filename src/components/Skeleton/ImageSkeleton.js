import React from "react";
import { Skeleton } from "@mui/material";
const ImageSkeleton = ({ length, width, height }) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rect"
          width={width}
          height={height}
          style={{ display: "inline-block" }}
        />
      ))}
    </>
  );
};

export default ImageSkeleton;
