import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';
import welcome from '../../assets/thanks13.png';
import welcome1 from '../../assets/pngwing.png'

class ListTrainingsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: this.props.match.params.courseName,
            employee: {},
            trainings: [],
            search: ''
        }
        this.viewDetails = this.viewDetails.bind(this);
        this.editDetails = this.editDetails.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.exit = this.exit.bind(this);
        this.viewAllTrainings = this.viewAllTrainings.bind(this);
        this.viewTraining = this.viewTraining.bind(this);
        this.saveTraining = this.saveTraining.bind(this);
        this.searchTraining = this.searchTraining.bind(this);
        this.changeSearchHandler = this.changeSearchHandler.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({ employee: res.data });
        })
        if (this.state.name === "_all") {
            EmployeeService.getEmployeeAllTrainings(this.state.id).then((res) => {
                this.setState({ trainings: res.data });
            });
        }
        else {
            EmployeeService.getTrainingsByEmpIdAndCourseName(this.state.id, this.state.name).then(res => {
                this.setState({ trainings: res.data });
            });
        }
    }

    viewDetails(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editDetails(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    exit() {
        this.props.history.push('/employees/_all');
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then((res) => {
            this.props.history.push("/employees/_all");
        });
    }

    viewAllTrainings(id) {
        this.props.history.push(`/trainings/${id}/_all`);
    }

    viewTraining(empId, courseId) {
        this.props.history.push(`/view-training/${empId}/${courseId}`);
    }

    saveTraining(id) {
        this.props.history.push(`/add-training/${id}/_add`);
    }

    searchTraining() {
        if (this.state.search === '') {
            this.props.history.push(`/trainings/${this.state.id}/_all`);
        }
        else {
            this.props.history.push(`/trainings/${this.state.id}/${this.state.search}`);
        }
    }

    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value })
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="welcomeTitle"><img src={welcome} className="welcome-logo" /> Welcome {this.state.employee.firstName} {this.state.employee.lastName} <img src={welcome} className="welcome-logo" /></h2>
                    <div className="text-center" style={{ marginTop: "20px" }}>
                        <button onClick={() => this.viewDetails(this.state.id)} className="btn btn-info">View Employee</button>
                        <button onClick={() => this.editDetails(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Employee</button>
                        <button onClick={() => this.viewAllTrainings(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>View Trainings</button>
                        <button onClick={() => this.deleteEmployee(this.state.id)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Employee</button>
                        <button className="btn btn-danger" onClick={this.exit} style={{ marginLeft: "50px" }}>Exit</button>
                    </div>
                </div>
                <br></br>
                <div className="card" style={{ backgroundColor: '#ffffff00',marginBottom:'-30px',marginTop:'-17px' }}>
                    <h3 className="cardTitle1"><img src={welcome1} className="welcome-logo" /> Trainings <img src={welcome1} className="welcome-logo" /></h3>
                    <div className="card-body" style={{ marginTop: "-76px" }}>
                        <form>
                            <div>
                                <button className="btn btn-primary" onClick={() => this.saveTraining(this.state.id)}>Add Training</button>
                                <div className="float-right">
                                    <form className="form-inline">
                                        <input placeholder="Search" name="search" className="form-control"
                                            value={this.state.search} onChange={this.changeSearchHandler}></input>
                                        <button className="btn btn-success" onClick={this.searchTraining} style={{ marginLeft: "10px" }}>Search</button>
                                    </form>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: "10px" }}>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Course Name</th>
                                            <th className="text-center">Code</th>
                                            <th className="text-center">Score</th>
                                            <th className="text-center">Time Spent</th>
                                            <th className="text-center">Date Of Completion</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.trainings.map(
                                                training =>
                                                    <tr key={training.id}>
                                                        <td className="text-center">{training.courseName}</td>
                                                        <td className="text-center">{training.code}</td>
                                                        <td className="text-center">{training.score}</td>
                                                        <td className="text-center">{training.timeSpent}</td>
                                                        <td className="text-center">{training.dateOfCompletion}</td>
                                                        <td className="text-center">{training.status}</td>
                                                        <td className="text-center">
                                                            <button onClick={() => this.viewTraining(training.employeeId, training.id)} className="btn btn-success">View</button>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default ListTrainingsComponent;