import * as React from 'react';
import App, {
  storiesReducer,
  Item,
  List,
  SearchForm,
  InputWithLabel,
  } from './App';

  import {
    render,
    screen,
    fireEvent,
    act,
  } from '@testing-library/react';

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe('storiesReducer', () => {
  test('removes a story from all stories', () => {
    const action = { type: 'REMOVE_STORY', payload: storyOne };

    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
    data: [storyTwo],
    isLoading: false,
    isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  test('initial loading of the app', ()=> {
    const action = {type: 'STORIES_FETCH_INIT'};

    const state = {data:[], isLoading: false, isError: false};

    const newState = storiesReducer(state, action);

    const expectedState = {data: [], isLoading: true, isError: false};

    expect(newState).toStrictEqual(expectedState)
  });

  test('succesful fetch', ()=> {
    const action = {type: 'STORIES_FETCH_SUCCESS', payload: stories};

    const state = {data: [], isLoading: false, isError: false};

    const newState = storiesReducer(state, action);

    const expectedState = {data: stories, isLoading: false, isError: false};

    expect(newState).toStrictEqual(expectedState)
  })

  test('failed fetch', ()=> {
    const action = {type: 'STORIES_FETCH_FAILURE'}

    const state = {data: [], isLoading: false, isError: false};

    const newState = storiesReducer(state, action)

    const expectedState = {data: [], isLoading: false, isError: true};

    expect(newState).toStrictEqual(expectedState)
  })
});

describe('Item', ()=> {
  test('renders all properties', ()=> {
    render(<Item item={storyOne} />)

    expect(screen.getByText('Jordan Walke')).toBeInTheDocument()
    expect(screen.getByText('React')).toHaveAttribute('href', 'https://reactjs.org/')
  });

  test('renders a clickable dismiss button', ()=> {
    render(< Item item={stories}/>)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('clicking the dismiss button calls the callback handler', ()=> {
    const handleRemoveItem = () => jest.fn();

    render(< Item item={stories} onRemoveItem={handleRemoveItem}/>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1)
  })
});

describe('SearchForm', ()=> {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };

  test('renders the input field with its value', ()=> {
    render(<SearchForm {...searchFormProps}/>)
  })
})
