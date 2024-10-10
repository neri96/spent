import styled from "styled-components";

import Backdrop from "@components/ui/Backdrop";
import ButtonIcon from "@components/ui/ButtonIcon";
import Icon from "@components/ui/Icon";

import FilterModal from "./FilterModal";

import useToggle from "@hooks/useToggle";

import IcFilter from "@assets/icons/filter.svg";

const StyledFilter = styled.div`
  margin-left: 10px;
`;

const Filter = () => {
  const { isActive, toggle } = useToggle();

  return (
    <StyledFilter>
      <ButtonIcon handleClick={toggle}>
        Filter
        <Icon src={IcFilter} title="Filter" />
      </ButtonIcon>

      <Backdrop isOpen={isActive} toggle={toggle}>
        <FilterModal closeModal={toggle} />
      </Backdrop>
    </StyledFilter>
  );
};

export default Filter;
