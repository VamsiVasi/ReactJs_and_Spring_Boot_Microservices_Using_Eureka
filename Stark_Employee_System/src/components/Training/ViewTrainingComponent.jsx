import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';
import welcome from '../../assets/thanks13.png';

class ViewTrainingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empId: this.props.match.params.empId,
            courseId: this.props.match.params.courseId,
            employee: {},
            training: {}
        }
        this.viewTrainingButton = this.viewTrainingButton.bind(this);
        this.editTrainingButton = this.editTrainingButton.bind(this);
        this.cancel = this.cancel.bind(this);
        this.exit = this.exit.bind(this);
        this.deleteTrainingButton = this.deleteTrainingButton.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.empId).then((res) => {
            this.setState({ employee: res.data });
        })
        EmployeeService.getTrainingByEmpIdAndCourseId(this.state.empId, this.state.courseId).then((res) => {
            this.setState({ training: res.data });
        })
    }

    viewTrainingButton(empId, courseId) {
        this.props.history.push(`/view-training/${empId}/${courseId}`);
    }

    editTrainingButton(empId, courseId) {
        this.props.history.push(`/add-training/${empId}/${courseId}`);
    }

    cancel() {
        this.props.history.push(`/trainings/${this.state.empId}/_all`);
    }

    exit() {
        this.props.history.push(`/trainings/${this.state.empId}/_all`);
    }

    deleteTrainingButton(empId, courseId) {
        EmployeeService.deleteTrainingById(empId, courseId).then((res) => {
            this.props.history.push(`/trainings/${this.state.empId}/_all`);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="welcomeTitle"><img src={welcome} className="welcome-logo" /> Welcome {this.state.employee.firstName} {this.state.employee.lastName} <img src={welcome} className="welcome-logo" /></h2>
                    <div className="text-center" style={{ marginTop: "20px" }}>
                        <button onClick={() => this.viewTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-info">View Training</button>
                        <button onClick={() => this.editTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Training</button>
                        <button onClick={() => this.deleteTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Training</button>
                        <button className="btn btn-danger" onClick={this.exit} style={{ marginLeft: "50px" }}>Exit</button>
                    </div>
                </div>
                <br></br>
                <div className="card col-md-6 offset-md-3" style={{ backgroundColor: '#323741' }}>
                    <h3 className="cardTitle">{this.state.training.courseName} Training</h3>
                    <div className="card-body" style={{ marginTop: "-12px" }}>
                        <form>
                            <div className="form-group">
                                <label>Course Name</label>
                                <input disabled="true" name="courseName" className="form-control"
                                    value={this.state.training.courseName}></input>
                            </div>
                            <div className="form-group">
                                <label>Code</label>
                                <input disabled="true" name="code" className="form-control"
                                    value={this.state.training.code}></input>
                            </div>
                            <div className="form-group">
                                <label>Score</label>
                                <input disabled="true" name="score" className="form-control"
                                    value={this.state.training.score}></input>
                            </div>
                            <div className="form-group">
                                <label>Time Spent</label>
                                <input disabled="true" name="timeSpent" className="form-control"
                                    value={this.state.training.timeSpent}></input>
                            </div>
                            <div className="form-group">
                                <label>Date Of Completion</label>
                                <input disabled="true" name="dateOfCompletion" className="form-control"
                                    value={this.state.training.dateOfCompletion}></input>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <input disabled="true" name="status" className="form-control"
                                    value={this.state.training.status}></input>
                            </div>
                            <button onClick={() => this.editTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-info">Edit</button>
                            <button onClick={this.cancel} className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}
export default ViewTrainingComponent;