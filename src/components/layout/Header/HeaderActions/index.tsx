import HeaderNavCreateItem from "./HeaderNavCreateItem";
import HeaderLogout from "./HeaderLogout";

import * as SC from "@common/styledComponents/header";

const HeaderActions = () => {
  return (
    <SC.HeaderData>
      <SC.HeaderDataList>
        <SC.HeaderDataItem>
          <HeaderNavCreateItem />
        </SC.HeaderDataItem>
        <SC.HeaderDataItem>
          <HeaderLogout />
        </SC.HeaderDataItem>
      </SC.HeaderDataList>
    </SC.HeaderData>
  );
};

export default HeaderActions;
