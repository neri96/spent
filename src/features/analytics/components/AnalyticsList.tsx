import styled from "styled-components";

import { useGetAnalyticsQuery } from "@app/services/analytics";

import AnalyticsDetails from "./AnalyticsDetails";
import Loading from "@components/ui/Loading";
import ErrorFetch from "@components/ui/ErrorFetch";

const StyledAnalyticsList = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 1250px) {
    flex-direction: column;
  }
`;

const AnalyticsList = () => {
  const { data, isLoading, isError } = useGetAnalyticsQuery(undefined);

  if (isLoading) return <Loading isFullPage />;

  if (isError)
    return (
      <ErrorFetch message="Failed to load data. Please try again later." />
    );

  return (
    <>
      <StyledAnalyticsList>
        {data?.map((analytics) => (
          <AnalyticsDetails key={analytics.id} data={analytics} />
        ))}
      </StyledAnalyticsList>
    </>
  );
};

export default AnalyticsList;
