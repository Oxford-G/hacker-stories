import * as React from 'react';
import axios from 'axios';
import styles from './App.module.css';
import { SearchForm } from './SearchForm';
import { List } from './List';

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

const useSemiPersistentState = (
  key,
  initialState
  ) => {

  const isMounted = React.useRef(false);

  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {

    if(!isMounted.current) {
      isMounted.current = true
    } else {
      localStorage.setItem(key, value);
    }
  },[value, key]);
  
  return [value, setValue]
};

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

const getSumComments = (stories) => {
  console.log('C');

  return stories.data.reduce(
    (result, value) => result + value.num_comments, 0)
};

const getLastSearches = (urls) => urls.slice(-5).map((url) => extractSearchTerm(url));

const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');

const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;


const App = () => {

  const[searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [urls, setUrls] = React.useState(
    [`${API_ENDPOINT}${searchTerm}`,]
  );

  // const [stories, setStories] = React.useState([]);

  const [stories, dispatchStories] = React.useReducer(storiesReducer,
    { data: [], isLoading: false, isError: false });

  /*const [isLoading, setIsLoading] = React.useState(false);*/

  /*const [isError, setIsError] = React.useState(false)*/

  const handleFetchStories = React.useCallback(async ()=>{
    if (searchTerm === '') return;

    /*setIsLoading(true);*/
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    
    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
        })
    } catch{
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    };
    
    // getAsyncStories()

    // fetch(`${API_ENDPOINT}${searchTerm}`).then(response => response.json())

    // fetch(`${url}`).then(response => response.json())

    /*axios.get(url)
    .then((result) => {

      // setStories(result.data.stories);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        // payload: result.data.stories
        // i am using data since axios wraps the result into a data object in JavaScript
        payload: result.data.hits
      });

      // setIsLoading(false);
    })
    */
    
    // .catch(()=> dispatchStories({ type: 'STORIES_FETCH_FAILURE' }))
  }, [urls]);
  
  React.useEffect(() =>{
    handleFetchStories();
  }, [handleFetchStories])

  const handleRemoveStory = React.useCallback((item) => {
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
  }, [])

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    handleSearch(searchTerm);
    // const url = `${API_ENDPOINT}${searchTerm}`;
    // setUrl(`${API_ENDPOINT}${searchTerm}`);
    // setUrls(urls.concat(url));

    event.preventDefault();
  };

  /*const searchedStories = stories.data.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )*/

  const handleLastSearch = (searchTerm) => {
    handleSearch(searchTerm);
    // const url = `${API_ENDPOINT}${searchTerm}`;
    // setUrls(urls.concat(url));
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const lastSearches = getLastSearches(urls);

  const sumComments = React.useMemo(()=> getSumComments(stories), [stories])

  return (
    <div className={styles.container}>
  
      <h1 className={styles.headlinePrimary}>My Hacker Stories with {sumComments} comments</h1>

      <h1>{welcome.greetings} {welcome.title}</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {lastSearches.map((searchTerm) => (
      <button
      key={searchTerm}
      type="button"
      onClick={() => handleLastSearch(searchTerm)}
      >
      {searchTerm}
      </button>
      ))}

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

export default App;
// export { storiesReducer, SearchForm, InputWithLabel, List, Item };
