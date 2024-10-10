import { ResponsivePie } from "@nivo/pie";
import styled, { css, useTheme } from "styled-components";

const StyledChartTooltip = styled.div`
  padding: 10px;
  ${({ theme }) => css`
    background: ${theme.softGray};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
    color: ${theme.textColor};
  `}
`;

const StyledChartTooltipContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledChartTooltipColor = styled.div<{ $color: string }>`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  margin-right: 5px;
`;

const PieChart = ({
  data,
}: {
  data: { id: string; label: string; value: number; color: string }[];
}) => {
  const theme = useTheme();

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.15}
      padAngle={1}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      colors={{ datum: "data.color" }}
      borderWidth={2}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabel={(d) => String(d.label)}
      arcLinkLabelsTextColor={theme.textColor}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      tooltip={({ datum }) => (
        <StyledChartTooltip>
          <StyledChartTooltipContainer>
            <StyledChartTooltipColor $color={datum.color} />
            <strong>
              {datum.label}: {datum.value}
            </strong>
          </StyledChartTooltipContainer>
        </StyledChartTooltip>
      )}
      theme={{
        labels: {
          text: {
            fontSize: 16,
          },
        },
      }}
      motionConfig="wobbly"
    />
  );
};

export default PieChart;
