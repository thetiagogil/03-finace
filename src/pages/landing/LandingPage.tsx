import { Box, Container, Divider } from "@mui/material";
import { LandingFeatureGrid } from "./_components/LandingFeatureGrid";
import { LandingFinalCta } from "./_components/LandingFinalCta";
import { LandingHero } from "./_components/LandingHero";
import { LandingPreviewCard } from "./_components/LandingPreviewCard";
import { useLandingPage } from "./hooks/useLandingPage";

export const LandingPage = () => {
  const { isAuthenticated, continueAsTestUser } = useLandingPage();

  return (
    <Container maxWidth="lg" sx={{ px: 3 }}>
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          gap: 6,
          alignItems: "center",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <LandingHero
          isAuthenticated={isAuthenticated}
          onTestUser={continueAsTestUser}
        />
        <LandingPreviewCard />
      </Box>
      <Divider />
      <LandingFeatureGrid />
      <Divider />
      <LandingFinalCta
        isAuthenticated={isAuthenticated}
        onTestUser={continueAsTestUser}
      />
    </Container>
  );
};
