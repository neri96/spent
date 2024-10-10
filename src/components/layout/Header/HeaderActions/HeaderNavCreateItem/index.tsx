import CreateTransaction from "./CreateTransaction";

import Tooltip, { TooltipPosition } from "@components/ui/Tooltip";
import Icon from "@components/ui/Icon";
import IcCreate from "@assets/icons/create.svg";

import useToggle from "@hooks/useToggle";

const HeaderNavCreateItem = () => {
  const { isActive, toggle } = useToggle();

  return (
    <>
      <Tooltip text="Create a transaction" position={TooltipPosition.Left}>
        <Icon
          src={IcCreate}
          title="Open create item modal"
          isButton
          onClick={toggle}
        />
      </Tooltip>
      <CreateTransaction isOpen={isActive} toggle={toggle} />
    </>
  );
};

export default HeaderNavCreateItem;
