import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeService from '../../services/EmployeeService';
import welcome from '../../assets/thanks13.png';

const scoreRegex = RegExp(
    /(^100%$|^100.00%$|^100.00$|^[0-9]{0,2}([.][0-9]{1,2})? *%?$)[ ]*/
);

const timeSpentRegex = RegExp(
    /(^24[h|H]$|^(([01]?[0-9]|2[0-3])[h|H] *)?([0-5][0-9][m|M])?[ ]* ?$) */
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};
const convert = (str) => {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

class CreateOrUpdateTrainingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empId: this.props.match.params.empId,
            courseId: this.props.match.params.courseId,
            courseName: '',
            code: '',
            score: '',
            timeSpent: '',
            dateOfCompletion: '',
            status: 'Started',
            employee: {},
            formErrors: {
                courseName: "",
                code: "",
                score: "",
                timeSpent: "",
                dateOfCompletion: ""
            }
        }
        this.changeScoreAndTimeHandler = this.changeScoreAndTimeHandler.bind(this);
        this.changeCourseNameHandler = this.changeCourseNameHandler.bind(this);
        this.changeCodeHandler = this.changeCodeHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeDOCHandler = this.changeDOCHandler.bind(this);
        this.saveOrUpdateTraining = this.saveOrUpdateTraining.bind(this);
        this.viewTrainingButton = this.viewTrainingButton.bind(this);
        this.editTrainingButton = this.editTrainingButton.bind(this);
        this.cancel = this.cancel.bind(this);
        this.deleteTrainingButton = this.deleteTrainingButton.bind(this);
        this.viewEmployeeButton = this.viewEmployeeButton.bind(this);
        this.editEmployeeButton = this.editEmployeeButton.bind(this);
        this.exitButton = this.exitButton.bind(this);
        this.deleteEmployeeButton = this.deleteEmployeeButton.bind(this);
        this.viewAllTrainingsButton = this.viewAllTrainingsButton.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
    };

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.empId).then((res) => {
            this.setState({ employee: res.data });
        })
        if (this.state.courseId === "_add") {
            return
        }
        else {
            EmployeeService.getTrainingByEmpIdAndCourseId(this.state.empId, this.state.courseId).then((res) => {
                let training = res.data;
                this.setState({
                    courseName: training.courseName,
                    code: training.code,
                    score: training.score,
                    timeSpent: training.timeSpent,
                    // dateOfCompletion: training.dateOfCompletion,
                    status: training.status
                });
            });
        }
    }

    saveOrUpdateTraining = (e) => {
        e.preventDefault();
        let training = {
            courseName: this.state.courseName,
            code: this.state.code,
            score: this.state.score,
            timeSpent: this.state.timeSpent,
            dateOfCompletion: convert(this.state.dateOfCompletion),
            status: this.state.status
        };
        console.log('Training : ' + JSON.stringify(training));
        let formErrors = { ...this.state.formErrors };
        if (training.courseName === '') {
            formErrors.courseName = "* Course Name is Required";
        }
        if (training.code === '') {
            formErrors.code = "* Code is Required";
        }
        if (training.score === '') {
            formErrors.score = "* Score is Required";
        }
        if (training.timeSpent === '') {
            formErrors.timeSpent = "* Time Spent is Required";
        }
        if (training.dateOfCompletion === 'NaN-aN-aN') {
            formErrors.dateOfCompletion = "* Date Of Completion is Required";
        }
        if (formValid(this.state) && training.dateOfCompletion !== 'NaN-aN-aN' && training.courseName !== '' && training.code !== '' && training.score !== '' && training.timeSpent !== '') {
            if (this.state.courseId === "_add") {
                EmployeeService.createTrainingByEmpId(training, this.state.empId).then(res => {
                    this.props.history.push(`/trainings/${this.state.empId}/_all`);
                });
            }
            else {
                EmployeeService.updateTrainingById(training, this.state.empId, this.state.courseId).then((res) => {
                    this.props.history.push(`/view-training/${this.state.empId}/${this.state.courseId}`);
                });
            }
        } else {
            console.log("Enter all Mandatory Details");
        }
        this.setState({ formErrors });
    }

    viewTrainingButton(empId, courseId) {
        this.props.history.push(`/view-training/${empId}/${courseId}`);
    }

    editTrainingButton(empId, courseId) {
        this.props.history.push(`/add-training/${empId}/${courseId}`);
    }

    cancel() {
        if (this.state.courseId === "_add") {
            this.props.history.push(`/trainings/${this.state.empId}/_all`);
        }
        else {
            this.props.history.push(`/view-training/${this.state.empId}/${this.state.courseId}`);
        }
    }

    deleteTrainingButton(empId, courseId) {
        EmployeeService.deleteTrainingById(empId, courseId).then((res) => {
            this.props.history.push(`/trainings/${this.state.empId}/_all`);
        });
    }

    viewEmployeeButton(empId) {
        this.props.history.push(`/view-employee/${empId}`);
    }

    editEmployeeButton(empId) {
        this.props.history.push(`/add-employee/${empId}`);
    }

    exitButton() {
        if (this.state.courseId === "_add") {
            this.props.history.push('/employees/_all');
        }
        else {
            this.props.history.push(`/trainings/${this.state.empId}/_all`);
        }
    }

    deleteEmployeeButton(empId) {
        EmployeeService.deleteEmployee(empId).then((res) => {
            this.props.history.push("/employees/_all");
        });
    }

    viewAllTrainingsButton(empId) {
        this.props.history.push(`/trainings/${empId}/_all`);
    }

    changeScoreAndTimeHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "score":
                formErrors.score =
                    scoreRegex.test(value) ? "" : "* Format : 100.00 or 100.00% or 100 or 100%";
                break;
            case "timeSpent":
                formErrors.timeSpent =
                    timeSpentRegex.test(value) ? "" : "* Format : 23h 59m or 23h 01m or 24h or 59m or 01m";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }
    changeCourseNameHandler = (event) => {
        let formErrors = { ...this.state.formErrors };
        formErrors.courseName = "";
        this.setState({ courseName: event.target.value, formErrors });
    }
    changeCodeHandler = (event) => {
        let formErrors = { ...this.state.formErrors };
        formErrors.code = "";
        this.setState({ code: event.target.value, formErrors });
    }
    changeStatusHandler = (event) => {
        this.setState({ status: event.target.value });
    }
    changeDOCHandler = (event) => {
        let formErrors = { ...this.state.formErrors };
        formErrors.dateOfCompletion = "";
        this.setState({ dateOfCompletion: event, formErrors });
    }

    getTitle() {
        if (this.state.courseId === "_add") {
            return <h3 className="cardTitle">Add Training</h3>;
        }
        else {
            return <h3 className="cardTitle">Edit {this.state.courseName} Training</h3>
        }
    }

    getMenu() {
        if (this.state.courseId === "_add") {
            return (
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <button onClick={() => this.viewEmployeeButton(this.state.empId)} className="btn btn-info">View Employee</button>
                    <button onClick={() => this.editEmployeeButton(this.state.empId)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Employee</button>
                    <button onClick={() => this.viewAllTrainingsButton(this.state.empId)} className="btn btn-info" style={{ marginLeft: "50px" }}>View Trainings</button>
                    <button onClick={() => this.deleteEmployeeButton(this.state.empId)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Employee</button>
                    <button className="btn btn-danger" onClick={this.exitButton} style={{ marginLeft: "50px" }}>Exit</button>
                </div>
            );
        }
        else {
            return (
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <button onClick={() => this.viewTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-info">View Training</button>
                    <button onClick={() => this.editTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Training</button>
                    <button onClick={() => this.deleteTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Training</button>
                    <button className="btn btn-danger" onClick={this.exitButton} style={{ marginLeft: "50px" }}>Exit</button>
                </div>);
        }
    }

    getSaveOrUpdateButton() {
        if (this.state.courseId === "_add") {
            return <button type='submit' className="btn btn-success" onClick={this.saveOrUpdateTraining}>Save</button>;
        }
        else {
            return <button type='submit' className="btn btn-success" onClick={this.saveOrUpdateTraining}>Update</button>;
        }
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <div>
                    <h2 className="welcomeTitle"><img src={welcome} className="welcome-logo" /> Welcome {this.state.employee.firstName} {this.state.employee.lastName} <img src={welcome} className="welcome-logo" /></h2>
                    {
                        this.getMenu()
                    }
                </div>
                <br></br>
                <div className="card col-md-6 offset-md-3" style={{ backgroundColor: '#323741' }}>
                    {
                        this.getTitle()
                    }
                    <div className="card-body" style={{ marginTop: "-12px" }}>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group">
                                <label>Course Name</label>
                                <input placeholder="Course Name" noValidate name="courseName" className="form-control"
                                    value={this.state.courseName} onChange={this.changeCourseNameHandler}></input>
                                {formErrors.courseName.length > 0 && (
                                    <span className='error'>{formErrors.courseName}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Code</label>
                                <input placeholder="Code" noValidate name="code" className="form-control"
                                    value={this.state.code} onChange={this.changeCodeHandler}></input>
                                {formErrors.code.length > 0 && (
                                    <span className='error'>{formErrors.code}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Score</label>
                                <input placeholder="0.0%" noValidate name="score" className="form-control"
                                    value={this.state.score} onChange={this.changeScoreAndTimeHandler}></input>
                                {formErrors.score.length > 0 && (
                                    <span className='error'>{formErrors.score}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Time Spent</label>
                                <input placeholder="0h 0m" noValidate name="timeSpent" className="form-control"
                                    value={this.state.timeSpent} onChange={this.changeScoreAndTimeHandler}></input>
                                {formErrors.timeSpent.length > 0 && (
                                    <span className='error'>{formErrors.timeSpent}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Date Of Completion</label>
                                <DatePicker placeholderText='Date Of Completion' noValidate className="form-control" selected={this.state.dateOfCompletion} onChange={this.changeDOCHandler} dateFormat="yyyy-MM-dd" ></DatePicker>
                                {
                                    <span className='error'>{formErrors.dateOfCompletion}</span>
                                }
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select value={this.state.status} noValidate className="form-control" onChange={this.changeStatusHandler}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Started">Started</option>
                                </select>
                            </div>
                            {
                                this.getSaveOrUpdateButton()
                            }
                            <button onClick={this.cancel} className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default CreateOrUpdateTrainingComponent;