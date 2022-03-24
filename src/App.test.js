import * as React from 'react';
import App, {
  storiesReducer,
  Item,
  List,
  SearchForm,
  InputWithLabel,
  } from './App';

describe('something truthy and falsy', () => {
  test('true to be true', ()=> {
    expect(true).toBe(true)
  });

  test('false to be false', ()=> {
    expect(false).toBe(false)
  })
})
