import React from 'react';
import '../payroll-form/payroll-form.scss';
import logo from '../../assets/images/logo.png';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse -1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import { thisExpression } from '@babel/types';

class PayrollForm extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            profile: '',
            gender: '',
            departments: ['HR', 'Sales', 'Engineer', 'Finance', 'Other'],
            department: [],
            salary: '',
            notes: '',
            day: '1',
            month: 'Jan',
            year: '2020',
            startDate: new Date("1 Jan 2020"),
            id: '',
            nameError: '',
            salaryError: '',
            dateError: '',
            isError: ''
        }
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(e.target.value)) {
            this.setState({ nameError: '' })
            this.setState({ isError: false })
        } else {
            this.setState({ nameError: 'Invalid Name' })
            this.setState({ isError: true })
        }
    }

    handleProfileChange = (e) => {
        this.setState({ profile: e.target.value })
    }

    handleGenderChange = (e) => {
        this.setState({ gender: e.target.value })
    }

    handleSalaryChange = (e) => {
        this.setState({ salary: e.target.value });
        if (e.target.value < 5000) {
            this.setState({ salaryError: 'Salary must be greater than 5000' })
            this.setState({ isError: true })
        } else {
            this.setState({ salaryError: '' });
            this.setState({ isError: false });
        }
    }

    handleNotesChange = (e) => {
        this.setState({ notes: e.target.value });
    }

    handleDayChange = (e) => {
        this.setState({ day: e.target.value });
        this.setStartDate(e.target.value, this.state.month, this.state.year);
    }

    handleMonthChange = (e) => {
        this.setState({ month: e.target.value });
        this.setStartDate(e.target.value, this.target.value, this.state.year);
    }

    handleYearChange = (e) => {
        this.setState({ year: e.target.value });
        this.setStartDate(e.target.value, this.state.month, this.target.value);
    }

    setStartDate = (day, month, year) => {
        let startDateValue = new Date(`${day} ${month} ${year}`);
        this.setState({ startDate: startDateValue });

        let now = new Date();
        let difference = Math.abs(now.getTime() - startDateValue.getTime());
        if (startDateValue > now) {
            this.setState({ dateError: 'Date Cannot be future date' });
            this.setState({ isError: true })
        } else if (difference / (1000 * 60 * 60 * 24) > 30) {
            this.setState({ dateError: 'Date is beyond 30 days' });
            this.setState({ isError: true })
        } else {
            this.setState({ dateError: '' })
            this.setState({ isError: false })
        }
    }

    onCheckChange = (name) => {
        let index = this.state.department.indexOf(name);
        let checkArray = [...this.state.department]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        this.setState({ department: checkArray });
    }
    getChecked = (name) => {
        return this.state.department && this.state.department.includes(name);
    }

    render() {
        return (
            <div className="payroll-main">
                <header className="header-content">
                    <div className="logo-content">
                        <img src={logo} alt="Employee Payroll Logo" />
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br />
                            <span className="emp-text payroll-text">PAYROLL</span>
                        </div>
                    </div>
                </header>

                <div className="form-content">
                    <form action="#" className="form">
                        <div className="form-header">Employee Payroll Form</div>
                        <div className="row-content">
                            <label className="label text" for="name">Name</label>
                            <input type="text" className="input" id="name" name="name" placeholder="Full Name" onChange={(e) => this.handleNameChange(e)} required />
                            <error-output className="text-error" htmlFor="name">{this.state.nameError}</error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="Profile Image">Profile Image</label>
                            <div className="profile-radio-content">
                                <label>
                                    <input type="radio" id="profile1" name="profile" value="../../assests/Ellipse -3.png" onChange={(e) => this.handleProfileChange} required />
                                    <img src={profile1} alt="profile1" id="image1" className="profile" />
                                </label>
                                <label>
                                    <input type="radio" id="profile2" name="profile" value="../../assests/Ellipse -1.png" onChange={(e) => this.handleProfileChange} required />
                                    <img src={profile2} alt="profile2" id="image2" className="profile" />
                                </label>
                                <label>
                                    <input type="radio" id="profile3" name="profile" value="../../assests/Ellipse -8.png" onChange={(e) => this.handleProfileChange} required />
                                    <img src={profile3} alt="profile3" id="image3" className="profile" />
                                </label>
                                <label>
                                    <input type="radio" id="profile4" name="profile" value="../../assests/Ellipse -7.png" onChange={(e) => this.handleProfileChange} required />
                                    <img src={profile4} alt="profile4" id="image4" className="profile" />
                                </label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="Male" />
                                <label className="text" for="male" >Male</label>
                                <input type="radio" id="female" name="gender" value="Female" />
                                <label className="text" for="female" >Female</label>
                            </div>
                        </div>

                        <div className="row-content">
                            <label className="label text" for="department">Department</label>
                            <div>
                                {this.state.departments.map(item => (
                                    <span key={item}>
                                        <input type="checkbox" className="checkbox" name={item} checked={this.getChecked(item)}
                                            onChange={() => this.onCheckChange(item)} value={item} />
                                        <label htmlFor={item} className="text">{item}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="salary">Salary</label>
                            <input className="input" type="range" min="5000" max="100000" onChange={(e) => this.handleSalaryChange(e)} id="salary" name="salary" placeholder="Salary"/>
                            <output className="salary-output text" htmlFor="salary">{this.state.salary}</output>                        </div>
                        <div className="row-content">
                            <label className="label text" for="notes">Note</label>
                            <textarea id="notes" className="input" name="notes" placeholder="" onChange={(e) => this.handleNoteChange(e)}></textarea>
                        </div>

                        <div className="row-content">
                            <label className="label text" for="startDate">Start Date</label>
                            <div id="date">
                                <select id="day" name="day" onChange={(e) =>this.handleDayChange(e) }>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                </select>
                                <select id="month" name="month" onChange={(e) => this.handleMonthChange(e)}>
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="Mar">March</option>
                                    <option value="Apr">April</option>
                                    <option value="May">May</option>
                                    <option value="Jun">June</option>
                                    <option value="Jul">July</option>
                                    <option value="Aug">August</option>
                                    <option value="Sep">September</option>
                                    <option value="Oct">October</option>
                                    <option value="Nov">November</option>
                                    <option value="Dec">December</option>
                                </select>
                                <select id="year" name="year" onChange={(e) => this.handleYearChange(e)}>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                            <error-output className="date-error" htmlFor="startDate">{this.state.dateError}</error-output>
                        </div>

                        <div className="button-content">
                            <a href="./HomePage.html" className="resetButton button cancelButton">Cancel</a>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton" onClick={(e) => this.save(e)}>Submit</button>
                                <button type="reset" className="resetButton button" id="resetBtn">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
export default PayrollForm;