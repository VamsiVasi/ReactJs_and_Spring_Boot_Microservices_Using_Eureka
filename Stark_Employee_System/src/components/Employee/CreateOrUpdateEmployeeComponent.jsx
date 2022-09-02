import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import EmployeeService from '../../services/EmployeeService';
import welcome from '../../assets/thanks13.png';
import stark from '../../assets/stark.png';

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

const stringContainsNumber = (checkValue) => {
    return /\d/.test(checkValue);
}

class CreateOrUpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            formErrors: {
                firstName: "",
                middleName: "",
                lastName: "",
                dateOfBirth: "",
                address: ""
            }
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.changeDOBHandler = this.changeDOBHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.viewEmployeeButton = this.viewEmployeeButton.bind(this);
        this.editEmployeeButton = this.editEmployeeButton.bind(this);
        this.cancel = this.cancel.bind(this);
        this.exitButton = this.exitButton.bind(this);
        this.deleteEmployeeButton = this.deleteEmployeeButton.bind(this);
        this.viewTrainingsButton = this.viewTrainingsButton.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
    };

    componentDidMount() {
        if (this.state.id === "_add") {
            return
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    middleName: employee.middleName,
                    lastName: employee.lastName,
                    // dateOfBirth: employee.dateOfBirth,
                    address: employee.address
                });
            });
        }
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            dateOfBirth: convert(this.state.dateOfBirth),
            address: this.state.address
        };
        let formErrors = { ...this.state.formErrors };
        console.log(employee)
        if (employee.firstName === '') {
            formErrors.firstName = "* First Name is Required";
        }
        if (employee.lastName === '') {
            formErrors.lastName = "* Last Name is Required";
        }
        if (employee.dateOfBirth === 'NaN-aN-aN') {
            formErrors.dateOfBirth = "* Date Of Birth is Required";
        }
        if (employee.address === '') {
            formErrors.address = "* Address is Required";
        }
        if (formValid(this.state) && employee.dateOfBirth !== 'NaN-aN-aN') {
            if (this.state.id === "_add") {
                EmployeeService.createEmployee(employee).then(res => {
                    this.props.history.push("/employees/_all");
                });
            }
            else {
                EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
                    this.props.history.push(`/view-employee/${this.state.id}`);
                });
            }
        } else {
            console.log("Enter all Mandatory Details");
        }
        this.setState({ formErrors });
    }

    viewEmployeeButton(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployeeButton(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    cancel() {
        if (this.state.id === "_add") {
            this.props.history.push('/employees/_all');
        }
        else {
            this.props.history.push(`/employee/${this.state.id}`);
        }
    }

    exitButton() {
        this.props.history.push('/employees/_all');
    }

    deleteEmployeeButton(id) {
        EmployeeService.deleteEmployee(id).then((res) => {
            this.props.history.push("/employees/_all");
        });
    }

    viewTrainingsButton(id) {
        this.props.history.push(`/trainings/${id}/_all`);
    }

    changeHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "firstName":
                formErrors.firstName =
                    (value.length < 3 || stringContainsNumber(value)) ? "* Minimum 3 Characaters without Numbers" : "";
                break;
            case "middleName":
                formErrors.middleName =
                    stringContainsNumber(event.target.value) ? "* Only Characters" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    (event.target.value.length < 3 || stringContainsNumber(event.target.value)) ? "* Minimum 3 Characaters without Numbers" : "";
                break;
            case "address":
                formErrors.address =
                    event.target.value.length === 0 ? "* Address is Required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }

    changeDOBHandler = (event) => {
        let formErrors = { ...this.state.formErrors };
        formErrors.dateOfBirth = "";
        this.setState({ dateOfBirth: event, formErrors });
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className="cardTitle">Add Employee</h3>;
        }
        else {
            return <h3 className="cardTitle">Edit Employee</h3>;
        }
    }
    getStarkTitle() {
        if (this.state.id === "_add") {
            return <h2 className="starkTitle"><img src={stark} className="stark-logo" /> Stark Employee System <img src={stark} className="stark-logo" /></h2>;
        } else {
            return
        }
    }
    getMenu() {
        if (this.state.id === "_add") {
            return
        }
        else {
            return (
                <div>
                    <h2 className="welcomeTitle" ><img src={welcome} className="welcome-logo" /> Welcome {this.state.firstName} {this.state.lastName} <img src={welcome} className="welcome-logo" /></h2>
                    <div className="text-center" style={{ marginTop: "20px" }}>
                        <button onClick={() => this.viewEmployeeButton(this.state.id)} className="btn btn-info">View Employee</button>
                        <button onClick={() => this.editEmployeeButton(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Employee</button>
                        <button onClick={() => this.viewTrainingsButton(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>View Trainings</button>
                        <button onClick={() => this.deleteEmployeeButton(this.state.id)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Employee</button>
                        <button className="btn btn-danger" onClick={this.exitButton} style={{ marginLeft: "50px" }}>Exit</button>
                    </div>
                </div>);
        }
    }

    getButton() {
        if (this.state.id === "_add") {
            return <button type='submit' className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>;
        }
        else {
            return <button type='submit' className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Update</button>;
        }
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                {
                    this.getStarkTitle()
                }
                {
                    this.getMenu()
                }
                <br></br>
                <div className="card col-md-6 offset-md-3" style={{ backgroundColor: '#323741' }}>
                    {
                        this.getTitle()
                    }
                    <div className="card-body" style={{ marginTop: "-12px" }}>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group">
                                <label>First Name</label>
                                <input placeholder="First Name" name="firstName" className="form-control"
                                    value={this.state.firstName} noValidate onChange={this.changeHandler}></input>
                                {formErrors.firstName.length > 0 && (
                                    <span className='error'>{formErrors.firstName}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input placeholder="Middle Name" name="middleName" className="form-control"
                                    value={this.state.middleName} noValidate onChange={this.changeHandler}></input>
                                {formErrors.middleName.length > 0 && (
                                    <span className='error'>{formErrors.middleName}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input placeholder="Last Name" name="lastName" className="form-control"
                                    value={this.state.lastName} noValidate onChange={this.changeHandler}></input>
                                {formErrors.lastName.length > 0 && (
                                    <span className='error'>{formErrors.lastName}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Date Of Birth</label>
                                <DatePicker placeholderText="Date Of Birth" noValidate className="form-control" selected={this.state.dateOfBirth} onChange={this.changeDOBHandler} dateFormat="yyyy-MM-dd" maxDate={new Date()}></DatePicker>
                                {formErrors.dateOfBirth.length > 0 && (
                                    <span className='error'>{formErrors.dateOfBirth}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input placeholder="Address" name="address" className="form-control"
                                    value={this.state.address} onChange={this.changeHandler}></input>
                                {formErrors.address.length > 0 && (
                                    <span className='error'>{formErrors.address}</span>
                                )}
                            </div>
                            {
                                this.getButton()
                            }
                            <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default CreateOrUpdateEmployeeComponent;