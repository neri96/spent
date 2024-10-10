import styled from "styled-components";

import { itemStyles, itemWrapperStyles } from "@common/styles";

const headerColumnTitles = [
  { title: "title", width: "" },
  { title: "type", width: "" },
  { title: "amount", width: "" },
  { title: "category", width: "" },
  { title: "date", width: "" },
];

const StyledItemColumnHeader = styled.div`
  ${itemWrapperStyles};
  min-height: 50px;
  background-color: ${({ theme }) => theme.softGray};
  margin-bottom: ${({ theme }) => theme.commonMargin};
  padding-right: 80px;
  box-sizing: border-box;
  @media (max-width: 830px) {
    display: none;
  }
`;

const StyledItemColumnHeaderTitle = styled.div<{ $width: string | number }>`
  ${itemStyles}
  color: ${({ theme }) => theme.yellow};
  font-weight: bold;
`;

const ItemColumnHeader = () => {
  return (
    <StyledItemColumnHeader>
      {headerColumnTitles.map(({ title, width }) => {
        return (
          <StyledItemColumnHeaderTitle key={title} $width={width}>
            {title}
          </StyledItemColumnHeaderTitle>
        );
      })}
    </StyledItemColumnHeader>
  );
};

export default ItemColumnHeader;
