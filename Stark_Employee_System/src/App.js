import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent';
import CreateOrUpdateEmployeeComponent from './components/Employee/CreateOrUpdateEmployeeComponent';
import ViewEmployeeComponent from './components/Employee/ViewEmployeeComponent';
import EmployeeMainPageComponent from './components/Employee/EmployeeMainPageComponent';
import ListTrainingsComponent from './components/Training/ListTrainingsComponent';
import ViewTrainingComponent from './components/Training/ViewTrainingComponent';
import CreateOrUpdateTrainingComponent from './components/Training/CreateOrUpdateTrainingComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListEmployeeComponent}></Route>
            <Route path="/employees/:name" component={ListEmployeeComponent}></Route>
            <Route path="/add-employee/:id" component={CreateOrUpdateEmployeeComponent}></Route>
            <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
            <Route path="/employee/:id" component={EmployeeMainPageComponent}></Route>
            <Route path="/trainings/:id/:courseName" component={ListTrainingsComponent}></Route>
            <Route path="/view-training/:empId/:courseId" component={ViewTrainingComponent}></Route>
            <Route path="/add-training/:empId?/:courseId?" component={CreateOrUpdateTrainingComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>

  );
}

export default App;
