import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

const list = [{
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Meow',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
  {
    title: 'Zoo',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 3,
  },
];


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.filterSearched = this.filterSearched.bind(this);
  }

  onDismiss(id) {
    this.setState({
      list: this.state.list.filter((item) => {
        return item.objectID !== id;
      })
    })
  }

  onSearch(term) {
    this.setState({searchTerm: term})
  }

  filterSearched(item) {
    if (item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
      return item
    }
  }

  render() {
    return (
      <div>
        <form>
          <input onChange={(e) => this.onSearch(e.target.value)} />
        </form>
        {this.state.list.filter(item => this.filterSearched(item)).map((item) => {
          return (
            <div key={item.objectID}>
              <ol>
                <li>{item.title}</li>
                <li>{item.url}</li>
                <li>{item.author}</li>
                <li>{item.num_comments}</li>
                <li>{item.points}</li>
              </ol>
              <button onClick={() => this.onDismiss(item.objectID)}>Remove</button>    
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;