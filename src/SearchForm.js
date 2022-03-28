import * as React from 'react';
import { InputWithLabel } from './InputWithLabel';
import styles from './App.module.css';

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  }) => (
    <form onSubmit={onSearchSubmit} className={styles.searchForm}>
    <InputWithLabel 
      id="search" 
      isFocused 
      value={searchTerm} 
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button
      type="submit"
      disabled={!searchTerm}
      className={`${styles.button} ${styles.buttonLarge}`}
    >
    Submit
    </button>
  </form>
);

export { SearchForm };
