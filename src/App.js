import * as React from 'react';
import axios from 'axios';

const welcome = {
  greetings: 'Hey',
  title: 'React'
}

/*const initialStories = [
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
];*/

/*const getAsyncStories = () => 
  new Promise((resolve) => 
    setTimeout(()=> resolve({data:{stories: initialStories}}), 2000)
  );*/

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {localStorage.setItem(key, value)}, [value, key])

  return [value, setValue]
}

const storiesReducer = (state, action) => {
  switch(action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
        (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {

  const[searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  // const [stories, setStories] = React.useState([]);

  const [stories, dispatchStories] = React.useReducer(storiesReducer,
    { data: [], isLoading: false, isError: false });

  /*const [isLoading, setIsLoading] = React.useState(false);*/

  /*const [isError, setIsError] = React.useState(false)*/

  const handleFetchStories = React.useCallback(()=>{
    if (searchTerm === '') return;

    /*setIsLoading(true);*/
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    
    // getAsyncStories()

    // fetch(`${API_ENDPOINT}${searchTerm}`).then(response => response.json())

    // fetch(`${url}`).then(response => response.json())

    // axios.get(url)
    // .then((result) => {

      // setStories(result.data.stories);

      // dispatchStories({
        // type: 'STORIES_FETCH_SUCCESS',
        // payload: result.data.stories
        // i am using data since axios wraps the result into a data object in JavaScript
        // payload: result.data.hits
      // });

      // setIsLoading(false);
    // })
    // .catch(()=> dispatchStories({ type: 'STORIES_FETCH_FAILURE' }))
    try{
      const result = await axios.get(url);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
        })
    } catch{dispatchStories({ type: 'STORIES_FETCH_FAILURE' })};
  }, [url]);
  
  React.useEffect(() =>{
    handleFetchStories();
  }, [handleFetchStories])

  const handleRemoveStory = (item) => {
    // const newStories = stories.filter((story) => item.objectID !== story.objectID);
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    });
    // setStories(newStories);

    // dispatchStories({
      // type: 'SET_STORIES',
      // payload: newStories
    // });
  }

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  /*const searchedStories = stories.data.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )*/

  return (
  <div className="App">
    <h1>{welcome.greetings} {welcome.title}</h1>

    <SearchForm
      searchTerm={searchTerm}
      onSearchInput={handleSearchInput}
      onSearchSubmit={handleSearchSubmit}
    />

    <hr />
    
    {stories.isError && <p>Something went wrong ...</p>}

    {stories.isLoading ?(

      <p>loading ...</p>
    ) : (

    // < List list={searchedStories} onRemoveItem={handleRemoveStory} />
    < List list={stories.data} onRemoveItem={handleRemoveStory} />
    )}
  </div>
)};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  }) => (
    <form onSubmit={onSearchSubmit}>
    <InputWithLabel 
      id="search" 
      isFocused 
      value={searchTerm} 
      // onInputChange={handleSearch}
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button
      type="submit"
      disabled={!searchTerm}
      // onClick={handleSearchSubmit}
    >
    Submit
    </button>
  </form>
);

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
