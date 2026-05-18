import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  titleVariant?: "h2" | "h3";
  titleMaxWidth?: number;
  titleTopMargin?: number;
  descriptionMaxWidth?: number;
}

export const PageHeader = ({
  eyebrow,
  title,
  description,
  actions,
  titleVariant = "h3",
  titleMaxWidth,
  titleTopMargin = 0,
  descriptionMaxWidth,
}: PageHeaderProps) => (
  <Stack
    direction={{ xs: "column", md: "row" }}
    justifyContent="space-between"
    alignItems={{ md: "flex-end" }}
    spacing={3}
  >
    <Box>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        variant={titleVariant}
        sx={{ mt: titleTopMargin, maxWidth: titleMaxWidth }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          color="text.secondary"
          sx={{ mt: 1, maxWidth: descriptionMaxWidth }}
        >
          {description}
        </Typography>
      ) : null}
    </Box>
    {actions ? <Box sx={{ flexShrink: 0 }}>{actions}</Box> : null}
  </Stack>
);
