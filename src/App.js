import * as React from 'react'

const welcome = {
  greetings: 'Hey',
  title: 'React'
}

const initialStories = [
  {  title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },

  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];

const getAsyncStories = () => {
  new Promise()({data:{stories: initialStories}})
};

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {localStorage.setItem(key, value)}, [value, key])

  return [value, setValue]
}

const App = () => {

  const[searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [stories, setStories] = React.useState([]);

  React.useEffect(() =>{
    getAsyncStories.then((result) => {
      setStories(result.data.stories)
    })
  }, [])

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => item.objectID !== story.objectID);
    setStories(newStories);
  }

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

    < List list={searchedStories} onRemoveItem={handleRemoveStory} />
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

const List = ({list, onRemoveItem}) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item = {item} onRemoveItem={onRemoveItem}/>
    ))}
  </ul>
  );

  const Item = ({item, onRemoveItem}) => {
    // const handleRemoveItem = () => {
    //   onRemoveItem(item)
    // }
    return(
    <li>
    <span>
      <a href={item.url}>{item.title}</a>  
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={()=>onRemoveItem(item)}>Dismiss</button>
    </span>
    </li>
  )};

export default App;
