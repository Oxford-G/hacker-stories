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

  const stories = [
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

  const[searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
  <div className="App">
    <h1>{welcome.greetings} {welcome.title}</h1>

    <Search search={searchTerm} onSearch={handleSearch}/>

    <hr />

    < List list={searchedStories}/>
  </div>
)};

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

const Search = ({search, onSearch}) => (
  <>
    <label htmlFor="search">search:</label>
    <input id="search" type="text" value={search} onChange={onSearch}></input>
  </>
);
export default App;
