import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        };
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users').then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    render() {

        const { robots, searchfield } = this.state;

        const fileredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });

        // make it smaller by using 条件式 instead of if else statement
        return !robots.length ? // when length 0 =>false, not opposite=> true, so when len is 0 true.
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={fileredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }

}


export default App;