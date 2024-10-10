import { Dispatch, SetStateAction, CSSProperties } from "react";

import Animated from "@components/ui/Animated";
import Button from "@components/ui/Button";
import Icon from "@components/ui/Icon";

import IcRemove from "@assets/icons/remove.svg";

const clearSearchValueStyles: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "5px",
  display: "flex",
  alignItems: "center",
};

const SearchErase = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Animated isVisible={Boolean(value)}>
      <Button
        isStyled={false}
        customStyles={clearSearchValueStyles}
        onClick={() => setValue("")}
      >
        <Icon src={IcRemove} title="Search bar" />
      </Button>
    </Animated>
  );
};

export default SearchErase;
