import { ReactNode } from "react";
import styled, { css } from "styled-components";

import { Head } from "@components/seo/Head";

const StyledPageLayout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PageLayout = ({
  title,
  description,
  children,
  isFixed = false,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  isFixed?: boolean;
}) => {
  return (
    <>
      <Head title={title} description={description} />
      <StyledPageLayout>{children}</StyledPageLayout>
    </>
  );
};

export default PageLayout;
