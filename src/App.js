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

  return (
  <div className="App">
    <h1>{welcome.greetings} {welcome.title}</h1>

    <Search />

    <hr />

    < List list={stories}/>
  </div>
)};

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <item key={item.objectID} item={item}/>
    ))}
  </ul>
  );

  const Item = (props) => (
    <li>
    <span>
      <a href={props.item.url}>{item.title}</a>  
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
    </li>
  )

const Search = () => {
  const handleChange = (event) => {
    console.log(event.target.value)
  }
  return (
    <div>
      <label htmlFor="search">search:</label>
      <input id="search" type="text" onChange={handleChange}></input>
    </div>
  );
}
export default App;
