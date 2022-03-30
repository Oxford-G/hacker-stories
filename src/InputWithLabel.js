import * as React from 'react';
import styles from './App.module.css';

const InputWithLabel = ({id, type="text", isFocused, children, value, onInputChange}) => {

  const inputRef = React.useRef();

  React.useEffect(() => {
      if(isFocused && inputRef.current){

        inputRef.current.focus();
      }
    }, [isFocused]);

  return(
    <>
      <label htmlFor={id} className={styles.label}>{children}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onInputChange} 
        className={styles.input}
      />
    </>
  )
}

export{ InputWithLabel }
