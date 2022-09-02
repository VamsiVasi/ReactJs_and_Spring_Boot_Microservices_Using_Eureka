import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';
import welcome from '../../assets/thanks13.png';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
        this.viewEmployeeButton = this.viewEmployeeButton.bind(this);
        this.editEmployeeButton = this.editEmployeeButton.bind(this);
        this.cancel = this.cancel.bind(this);
        this.exitButton=this.exitButton.bind(this);
        this.deleteEmployeeButton = this.deleteEmployeeButton.bind(this);
        this.viewTrainingsButton=this.viewTrainingsButton.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                middleName: employee.middleName,
                lastName: employee.lastName,
                dateOfBirth: employee.dateOfBirth,
                address: employee.address
            });
        });
    }

    viewEmployeeButton(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployeeButton(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    cancel() {
        this.props.history.push(`/employee/${this.state.id}`);
    }

    exitButton() {
        this.props.history.push('/employees/_all');
    }

    deleteEmployeeButton(id) {
        EmployeeService.deleteEmployee(id).then((res) => {
            this.props.history.push("/employees/_all");
        });
    }

    viewTrainingsButton(id){
        this.props.history.push(`/trainings/${id}/_all`);
    }

    render() {
        return (
            <div>
                <div>
                <h2 className="welcomeTitle"><img src={welcome} className="welcome-logo" /> Welcome {this.state.firstName} {this.state.lastName} <img src={welcome} className="welcome-logo" /></h2>
                    <div className="text-center" style={{ marginTop: "20px" }}>
                        <button onClick={() => this.viewEmployeeButton(this.state.id)} className="btn btn-info">View Employee</button>
                        <button onClick={() => this.editEmployeeButton(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Employee</button>
                        <button onClick={() => this.viewTrainingsButton(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>View Trainings</button>
                        <button onClick={() => this.deleteEmployeeButton(this.state.id)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Employee</button>
                        <button className="btn btn-danger" onClick={this.exitButton} style={{ marginLeft: "50px" }}>Exit</button>
                    </div>
                </div>
                <br></br>
                <div className="card col-md-6 offset-md-3" style={{ backgroundColor: '#323741' }}>
                    <h3 className="cardTitle">View Employee</h3>
                    <div className="card-body" style={{ marginTop: "-12px" }}>
                        <form>
                            <div className="form-group">
                                <label>First Name</label>
                                <input disabled={true} name="firstName" className="form-control"
                                    value={this.state.firstName}></input>
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input disabled={true} name="middleName" className="form-control"
                                    value={this.state.middleName}></input>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input disabled={true} name="lastName" className="form-control"
                                    value={this.state.lastName}></input>
                            </div>
                            <div className="form-group">
                                <label>Date Of Birth</label>
                                <input disabled={true} name="dateOfBirth" className="form-control"
                                    value={this.state.dateOfBirth}></input>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input disabled={true} name="address" className="form-control"
                                    value={this.state.address}></input>
                            </div>
                            <button onClick={() => this.editEmployeeButton(this.state.id)} className="btn btn-info">Edit</button>
                            <button onClick={this.cancel} className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default ViewEmployeeComponent;