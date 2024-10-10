import Icon from "@components/ui/Icon";

import Tooltip, { TooltipPosition } from "@components/ui/Tooltip";

import { useAppDispatch } from "@app/store";
import { logout } from "@features/auth/authSlice";
import { useLogoutMutation } from "@app/services/auth";

import IcLogout from "@assets/icons/logout.svg";

const HeaderLogout = () => {
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation();
    dispatch(logout());
  };

  return (
    <Tooltip text="Log out" position={TooltipPosition.Left}>
      <Icon src={IcLogout} title="Log out" isButton onClick={handleLogout} />
    </Tooltip>
  );
};

export default HeaderLogout;
