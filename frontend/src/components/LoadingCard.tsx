import { Skeleton } from "@mui/material";

export function LoadingCard() {
  return (
    <Skeleton
      width={144}
      height={144}
      variant="rectangular"
      sx={{ bgcolor: "grey.900" }}
    />
  );
}
