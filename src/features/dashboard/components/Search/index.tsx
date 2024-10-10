import { useState, useEffect, ChangeEvent, CSSProperties } from "react";
import styled from "styled-components";

import { useAppDispatch } from "@app/store";
import { setSearchQuery } from "@features/dashboard/slices/searchSlice";

import SearchErase from "./SearchErase";
import Icon from "@components/ui/Icon";

import useDebounce from "@hooks/useDebounce";

import { fieldStyles } from "@common/styles";

import IcSearch from "@assets/icons/search.svg";

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSearchInput = styled.input`
  ${fieldStyles};
  width: 100%;
  padding: 0 35px;
`;

const searchIconStyles: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "5px",
};

const Search = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue));
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <StyledSearch>
      <Icon src={IcSearch} title="Search bar" customStyles={searchIconStyles} />
      <StyledSearchInput
        type="text"
        name="search"
        value={value}
        onChange={handleChange}
      />
      <SearchErase value={value} setValue={setValue} />
    </StyledSearch>
  );
};

export default Search;
