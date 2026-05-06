import { OverviewTabs } from "../components/layout/overview-tabs";
import { AuthPageContainer } from "../components/shared/containers";
import { TabsStatus } from "../components/shared/tabs-status";

export const OverviewPage = () => {
  return (
    <AuthPageContainer>
      <TabsStatus trackedTab={<OverviewTabs status="tracked" />} plannedTab={<OverviewTabs status="planned" />} />
    </AuthPageContainer>
  );
};
