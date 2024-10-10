import { useState } from "react";

import styled from "styled-components";

import ButtonIcon from "@components/ui/ButtonIcon";
import Icon from "@components/ui/Icon";

import IcSort from "@assets/icons/sort.svg";
import IcSortHigh from "@assets/icons/sort-high.svg";
import IcSortLow from "@assets/icons/sort-low.svg";

enum SortEnum {
  Unset,
  Lowest,
  Highest,
}

const StyledSort = styled.div<{ $isActive: boolean }>`
  margin-left: 10px;
  background-color: ${({ theme, $isActive }) => $isActive && theme.green2};
`;

const Sort = () => {
  const [sort, setSort] = useState(SortEnum.Unset);

  return (
    <StyledSort $isActive={sort !== SortEnum.Unset}>
      <ButtonIcon handleClick={() => null}>
        Sort
        <Icon src={IcSort} title="Sort" />
      </ButtonIcon>
    </StyledSort>
  );
};

export default Sort;
