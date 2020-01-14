import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';
import { setSearchField } from '../actions';

//tell me what state I need to listen to and send down as props.
const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

//tell me what props I should listen to that are actions that need to get dispatched.
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            // searchfield: ''
        };
    }

    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value });
    // }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users').then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    render() {

        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;

        const fileredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        // make it smaller by using 条件式 instead of if else statement
        return !robots.length ? // when length 0 =>false, not opposite=> true, so when len is 0 true.
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={fileredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }

}

// higher order component, so have two ()s.
export default connect(mapStateToProps, mapDispatchToProps)(App);