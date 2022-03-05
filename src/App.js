import * as React from 'react'

const welcome = {
  greetings: 'Hey',
  title: 'React'
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

  const [searchTerm, setSearchTerm] = React.useState('React')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
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
      <Item 
        key={item.objectID}
        title={item.title}
        url = {item.url}
        author = {item.author}
        num_comments = {item.num_comments}
        points = {item.points}
        />
    ))}
  </ul>
  );

  const Item = ({ title, url, author, num_comments, points}) => (
    <li>
    <span>
      <a href={url}>{title}</a>  
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
    </li>
  );

const Search = ({search, onSearch}) => (
  <div>
    <label htmlFor="search">search:</label>
    <input id="search" type="text" value={search} onChange={onSearch}></input>

  </div>
);
export default App;
