import { render, screen } from '@testing-library/react';
import App from './App';

describe('something truthy and falsy', () => {
  test('true to be true', ()=> {
    expect(true).toBe(true)
  });

  test('false to be false', ()=> {
    expect(false).toBe(false)
  })
})
