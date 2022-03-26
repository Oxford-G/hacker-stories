const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  }) => (
    <StyledSearchForm onSubmit={onSearchSubmit}>
    <InputWithLabel 
      id="search" 
      isFocused 
      value={searchTerm} 
      // onInputChange={handleSearch}
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <StyledButtonLarge
      type="submit"
      disabled={!searchTerm}
      // onClick={handleSearchSubmit}
    >
    Submit
    </StyledButtonLarge>
  </StyledSearchForm>
);
