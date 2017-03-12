import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAQmsUYmblZY_OshaVbl9fGiq09oVtPkMc';

class App extends Component {
    constructor (props) {
        super (props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('Phil Defranco');
    }

    videoSearch (term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
             });
            // This will get resolved as this.setState({ videos: videos });
            // Only works when key and value have the exact same name
        });
    }
    // Passing props to the child component
    render () {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated HTML and put it on the page (in the DOM)
// Wrapping our component with JSX tags will create an instance of our component
// The second parameter to ReactDOM.render is the parent container for our component
ReactDOM.render(<App />, document.querySelector('.container'));
