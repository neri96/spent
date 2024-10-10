import HeaderHome from "./HeaderHome";
import HeaderNavAnalytics from "./HeaderNavAnalytics";

import IcNav from "@assets/icons/nav.svg";

import HeaderData from "../HeaderData";

const HeaderNav = () => {
  return (
    <HeaderData
      headerDataBtn={{ src: IcNav, title: "Navigation button" }}
      isNav
    >
      <HeaderHome />
      <HeaderNavAnalytics />
    </HeaderData>
  );
};

export default HeaderNav;
