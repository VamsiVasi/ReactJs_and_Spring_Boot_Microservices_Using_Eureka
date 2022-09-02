import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';
import welcome from '../../assets/thanks13.png';

class EmployeeMainPageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
        this.viewEmployeeButton = this.viewEmployeeButton.bind(this);
        this.editEmployeeButton = this.editEmployeeButton.bind(this);
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
            </div>
        );
    }
}


export default EmployeeMainPageComponent;