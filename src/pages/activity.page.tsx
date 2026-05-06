import { ActivityTabs } from "../components/layout/activity-tabs";
import { AuthPageContainer } from "../components/shared/containers";
import { TabsStatus } from "../components/shared/tabs-status";

export const ActivityPage = () => {
  return (
    <AuthPageContainer>
      <TabsStatus trackedTab={<ActivityTabs status="tracked" />} plannedTab={<ActivityTabs status="planned" />} />
    </AuthPageContainer>
  );
};
