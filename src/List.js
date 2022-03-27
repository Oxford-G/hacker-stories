import * as React from 'react';
import { ReactComponent as Check } from './delete.svg';
import styles from './App.module.css';

const List = React.memo(
  ({list, onRemoveItem}) => {
    const [sort, setSort] = React.useState('NONE');

    const handleSort = (sortKey) => {
      setSort(sortKey);
    };

    return(
      <ul>
        <li style={{ display: 'flex' }}>
          <span style={{ width: '40%' }}>
            <button type="button" onClick={() => handleSort('TITLE')}>
            Title
            </button>
          </span>
          <span style={{ width: '30%' }}>
            <button type="button" onClick={() => handleSort('Author')}>
            Author
            </button>
          </span>
          <span style={{ width: '10%' }}>
            <button type="button" onClick={() => handleSort('Comments')}>
            Comments
            </button>
          </span>
          <span style={{ width: '10%' }}>
            <button type="button" onClick={() => handleSort('Points')}>
            Points
            </button>
          </span>
          <span style={{ width: '10%' }}>
            <button type="button" onClick={() => handleSort('Actions')}>
            Actions
            </button>
          </span>
        </li>

        {list.map((item) => (
          <Item key={item.objectID} item = {item} onRemoveItem={onRemoveItem}/>
        ))}
      </ul>
    )
  }
);

const Item = (
  {item, onRemoveItem}) => (
  <li className={styles.item} style={{ display: 'flex' }}>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>  
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}>{item.num_comments}</span>
    <span style={{ width: '10%' }}>{item.points}</span>
    <span style={{ width: '10%' }}>
      <button 
      type="button" 
      onClick={()=>onRemoveItem(item)}
      className={`${styles.button} ${styles.buttonSmall}`}
      >
      <Check height="18px" width="18px"/>
      </button>
    </span>
  </li>
);

export { List };
