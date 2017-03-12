// Import react and pull off the property `Component` as a variable called 'Component'
import React, { Component } from 'react';


class SearchBar extends Component {
    // All js classes have a constructor function which is called whenever a new instance
    // of the class is created. It is responsible for initializing an object.
    constructor (props) {
        super(props);

        this.state = { term: '' };
    }
    // Every react component that is class based must have a render method
    render () {
        return (
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }


    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;
