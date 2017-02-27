import React, {Component} from 'react';
import Search from './components/search';
import Table from './components/table';

const DEFAULT_QUERY = 'javascript';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.filterSearched = this.filterSearched.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);

  }

  onDismiss(id) {
    this.setState({
      result:  { 
          hits: this.state.result.hits.filter(item => item.objectID !== id) 
      }
    })
  }

  onSearch(event) {
    this.setState({searchTerm: event.target.value})
  }

  filterSearched(item) {
    if (item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
      return item
    }
  }

  setSearchTopstories(result) {
    this.setState({result});
  }

  fetchSearchTopstories(e) {
    const searchTerm = e.target.value;
    if (e.keyCode == 13) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
      this.setState({searchTerm})
    }
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  render() {
    const { searchTerm, result } = this.state;
    if (!result) return null;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm} 
            onSearch={this.onSearch} 
            newSearch={this.fetchSearchTopstories} 
          />
        </div>
        <Table
          list={result.hits}
          onDismiss={this.onDismiss}
          filterSearched={this.filterSearched}
        />
      </div>
    );
  }
}

export default App;