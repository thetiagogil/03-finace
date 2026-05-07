import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { Box, Card, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
  variant?: "card" | "plain";
}

export const EmptyState = ({ title, description, action, compact = false, variant = "card" }: EmptyStateProps) => {
  const content = (
    <Stack spacing={1.5} alignItems="center" sx={{ maxWidth: 480, mx: "auto" }}>
      <Box
        sx={{
          width: compact ? 40 : 48,
          height: compact ? 40 : 48,
          display: "grid",
          placeItems: "center",
          bgcolor: "rgba(90,117,189,0.10)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          color: "primary.main"
        }}
      >
        <InboxOutlinedIcon fontSize={compact ? "small" : "medium"} />
      </Box>
      <Box>
        <Typography variant={compact ? "subtitle1" : "h6"} fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      </Box>
      {action}
    </Stack>
  );

  const styles = {
    p: compact ? 3 : 4,
    borderRadius: 3,
    textAlign: "center",
    bgcolor: "rgba(241,244,248,0.72)"
  };

  if (variant === "plain") {
    return <Box sx={styles}>{content}</Box>;
  }

  return (
    <Card variant="outlined" sx={styles}>
      {content}
    </Card>
  );
};
