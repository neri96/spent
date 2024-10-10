import styled from "styled-components";

import Backdrop from "@components/ui/Backdrop";
import Dialog from "@components/ui/Dialog";
import Icon from "@components/ui/Icon";

import useToggle from "@hooks/useToggle";

import IcReport from "@assets/icons/report.svg";

import { IAnalyticsData } from "../ts/interfaces";

const StyledAnalyticsReport = styled.div`
  width: 25px;
  position: absolute;
  top: 50px;
  right: 0;
  @media (max-width: 1250px) {
    left: calc(50% + 250px);
  }

  @media (max-width: 600px) {
    left: 10px;
  }
`;

const StyledAnalyticsList = styled.ul`
  display: flex;
  flex-direction: column;
`;
const StyledAnalyticsItem = styled.li`
  display: flex;
  margin: 5px 0;
`;

const StyledAnalyticsColor = styled.div<{ $background: string }>`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${({ $background }) => $background};
  margin-right: 10px;
`;

const AnalyticsReport = ({ data }: { data: IAnalyticsData[] }) => {
  const { isActive, toggle } = useToggle();

  return (
    <StyledAnalyticsReport>
      <Icon src={IcReport} title="Inspect data" isButton onClick={toggle} />

      <Backdrop isOpen={isActive} toggle={toggle}>
        <Dialog toggle={toggle}>
          <StyledAnalyticsList>
            {data.map(({ id, label, value, color }) => {
              return (
                <StyledAnalyticsItem key={id}>
                  <StyledAnalyticsColor $background={color} />
                  <span>
                    {label}: {value}$
                  </span>
                </StyledAnalyticsItem>
              );
            })}
          </StyledAnalyticsList>
        </Dialog>
      </Backdrop>
    </StyledAnalyticsReport>
  );
};
export default AnalyticsReport;
