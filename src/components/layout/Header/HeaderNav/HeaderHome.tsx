import { Link } from "react-router-dom";

import Tooltip from "@components/ui/Tooltip";
import Icon from "@components/ui/Icon";

import IcHome from "@assets/icons/home.svg";

const HeaderNavBudget = () => {
  return (
    <Tooltip text="Home">
      <Link to="/">
        <Icon src={IcHome} title="Go to home page" isButton />
      </Link>
    </Tooltip>
  );
};

export default HeaderNavBudget;
