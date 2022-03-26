const InputWithLabel = ({id, type="text", isFocused, children, value, onInputChange}) => {

  const inputRef = React.useRef();

  React.useEffect(() => {
      if(isFocused && inputRef.current){

        inputRef.current.focus();
      }
    }, [isFocused]);

  return(
    <>
      <StyledLabel htmlFor={id}>{children}:</StyledLabel>
      <StyledInput ref={inputRef} type={type} value={value} onChange={onInputChange} />
    </>
  )
}
