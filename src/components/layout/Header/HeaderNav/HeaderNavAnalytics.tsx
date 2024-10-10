import Icon from "@components/ui/Icon";

import Tooltip, { TooltipPosition } from "@components/ui/Tooltip";

import { useNavigate } from "react-router-dom";

import Icanalytics from "@assets/icons/analytics.svg";

const HeaderNavAnalytics = () => {
  const navigate = useNavigate();

  const handlePageSwitch = () => navigate("/analytics");

  return (
    <Tooltip text="Analytics" position={TooltipPosition.Center}>
      <Icon
        src={Icanalytics}
        title="Go to analytics page"
        isButton
        onClick={handlePageSwitch}
      />
    </Tooltip>
  );
};

export default HeaderNavAnalytics;
