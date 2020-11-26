import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import PostList from './components/PostList';
import VisitedRestaurants from './components/VisitedRestaurants';
import {useState} from 'react';
import {createStore} from 'redux';
import './components/design.css';
import {combineReducers} from 'redux';
function App() {
const [currentRest,setCurrentRest] = useState([]);
const[date,setDate] = useState([]);
function restInfo(restaurent,datev){
setCurrentRest(
  [...currentRest,
  restaurent]
);
setDate([...date,datev])
}
function returnAllRest(allRest){
  return allRest;
}
function returnCurrentRest(){
  return currentRest;
}
//This is the reducer and the store
const red  = combineReducers(returnAllRest,returnCurrentRest);
const store = createStore(red);
  return (
    <Router>
    <div className="App">
      <div className="header">
      <ul>
        <Link to="/page1">
        <li>Page 1</li>
        </Link>
        <Link to="/page2">
        <li id="page2">Page 2</li>
        </Link>
      </ul>
      </div>
      <Route
  path='/page1'
  render={() => (
    <PostList  restInfo={restInfo} returnAllRest={returnAllRest}/>
  )}
/>
<Route
  path='/page2'
  render={() => (
    <VisitedRestaurants  currentRest={currentRest} date={date}/>
  )}
/>
    </div>
    </Router>
  );
}

export default App;
