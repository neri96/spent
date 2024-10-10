import styled, { css } from "styled-components";

const StyledHeaderBudget = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

const StyledCircle = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
`;

const StyledCircleInner = styled.div`
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  background-color: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
`;

const StyledCircleBorder = styled.div<{ $value: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme, $value }) => `${theme.green} ${$value}%, transparent 0`}
  );
  transition: background 0.5s ease;
`;

const HeaderBudget = ({
  budget,
  expenses,
}: {
  budget: number;
  expenses: number;
}) => {
  const expensesPositive = Math.abs(expenses);

  const percentage = (expensesPositive / budget) * 100;

  return (
    <StyledHeaderBudget>
      <StyledCircle>
        <StyledCircleInner></StyledCircleInner>
        <StyledCircleBorder $value={percentage} />
      </StyledCircle>
      <span>
        {Math.abs(expensesPositive)}/{budget}
      </span>
    </StyledHeaderBudget>
  );
};

export default HeaderBudget;
