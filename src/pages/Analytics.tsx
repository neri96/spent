import PageLayout from "@components/layout/PageLayout";
import { AnalyticsContainer } from "@features/analytics";

const Analytics = () => {
  return (
    <PageLayout title="Analytics" isFixed={false}>
      <AnalyticsContainer />
    </PageLayout>
  );
};

export default Analytics;
