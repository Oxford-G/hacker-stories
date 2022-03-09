import * as React from 'react'

const welcome = {
  greetings: 'Hey',
  title: 'React'
}

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {localStorage.setItem(key, value)}, [value, key])

  return [value, setValue]
}

const App = () => {

  // const[searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [stories, setStories] = React.useState(initialStories)

   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
  <div className="App">
    <h1>{welcome.greetings} {welcome.title}</h1>

    <InputWithLabel id="search" isFocused value={searchTerm} onInputChange={handleSearch}>
      <strong>Search:</strong>
    </InputWithLabel>

    <hr />

    < List list={searchedStories}/>
  </div>
)};

const InputWithLabel = ({id, type="text", isFocused, children, value, onInputChange}) => {

  const inputRef = React.useRef();

  React.useEffect(() => {
      if(isFocused && inputRef.current){

        inputRef.current.focus();
      }
    }, [isFocused]);

  return(
    <>
      <label htmlFor={id}>{children}:</label>
      <input ref={inputRef} type={type} value={value} onChange={onInputChange} />
    </>
  )
}

const List = ({list}) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item = {item} />
    ))}
  </ul>
  );

  const Item = ({item}) => (
    <li>
    <span>
      <a href={item.url}>{item.title}</a>  
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    </li>
  );

export default App;
