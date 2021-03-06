import React, { Component } from 'react';
import ApplicationService from '../services/ApplicationService';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import dateFormat from 'dateformat';
let user_logged= localStorage.getItem('user_type');
class UpdateApplicationComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            id: this.props.match.params.id,
            name: '',
            username: '',
            startDate: '',
            endDate: '',
            status: '',
            reason: ''
        }
        this.changeNameHandler= this.changeNameHandler.bind(this);
        this.changeUsernameHandler= this.changeUsernameHandler.bind(this);
        this.changeStartDateHandler= this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler= this.changeEndDateHandler.bind(this);
        this.changeStatusHandler= this.changeStatusHandler.bind(this);
        this.updateApplication =this.updateApplication.bind(this);
      }

      componentDidMount(){
          ApplicationService.getApplicationById(this.state.id).then( (res) =>{
              let application =res.data;
              this.setState({name: application.name,
                username: application.username,
                startDate: application. startDate,
                endDate: application.endDate,
                reason: application.reason,
                status: application.status });
          });
      }
      updateApplication  = (event) => {
        event.preventDefault();
        let validation_message = '';
        let nameValue = this.state.name;
        if (nameValue === '') {
            nameValue = "Days off";
        }
        if (this.state.startDate==='') {
            validation_message = validation_message + ' Start Date should not be empty. ';
        }
        if (this.state.endDate==='') {
          validation_message = validation_message + ' End Date should not be empty. ';
      }
       
       
            
      if (validation_message==='') {
        let status_ob = this.state.status;
        if (status_ob === "") {
          status_ob = "Proccessed";
        }
        let application = {name: nameValue, username: this.state.username,status: status_ob,
            startDate: this.state.startDate, endDate: this.state.endDate  
                 };

        ApplicationService.updateApplication(application, this.state.id ).then(res => {
          this.props.history.push('/application');
          alertify.success('Application updated successfully.');
        }).catch ( res => {
          alertify.error('Application could not be updated.');
        }
        );
      } else {
        alertify.error(validation_message);
      }
      
      }
    changeNameHandler=(event)  => {
        this.setState({name: event.target.value});

    }
    changeUsernameHandler=(event)  => {
        this.setState({username: event.target.value});

    }
    changeStatusHandler=(event)  => {
        this.setState({status: event.target.value});

    }
    changeStartDateHandler=(event)  => {
        this.setState({startDate: event.target.value});

    }
    changeEndDateHandler=(event)  => {
        this.setState({endDate: event.target.value});

    }
    cancel()  {
        this.props.history.push('/application');
    }
    logoutButton=(event)  => {
        event.preventDefault();
        LoginService.logout().then( res => {    
        alertify.success("Logout successful.",);
        this.props.history.push('/');
        setTimeout(window.location.reload.bind(window.location), 1000);
        });
      }
    render() {
  
            if (user_logged === 'User') {
                return (
                    <div>
                        <div className="container">
                            <br>
                            </br>
                            <br>
                            </br>
                            <div className="row row-primary">
                                <div className="card col-md-6 offset-md-3 offset-md-3 ">
                                    <h3 className="text-center text-muted"> Update Application Details</h3>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                            <label>Application Type</label>
                                                <select className="form-control" name="name" value={this.state.name} onChange={this.changeNameHandler} value={this.state.name}>
                                                <option defaultValue="Days off" >Days off</option>
                                                <option value="Vacations">Vacations</option>
                                                <option value="Compensation days">Compensation days</option>
                                            </select>  </div>
                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input type='date' placeholder="startDate" name="startDate" className="form-control"  onChange={this.changeStartDateHandler} value={dateFormat(this.state.startDate,"yyyy-mm-dd")} />
                                            </div>
                                            <div className="form-group">
                                                <label>End Date</label>
                                                <input type='date' placeholder="endDate" name="endDate" className="form-control"  onChange={this.changeEndDateHandler} value={dateFormat(this.state.endDate,"yyyy-mm-dd")} />
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <input placeholder="status" name="status" className="form-control" value={this.state.status} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Reason</label>
                                                <input placeholder="reason" name="reason" className="form-control" value={this.state.reason} readOnly/>
                                            </div>
                                            <br>
                                            </br>
                                           
                                            <button className="btn btn-outline-success" onClick={this.updateApplication} style={{ width: "100px"}}>Update</button>
                                            <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ width: "100px", marginLeft: "15px"}}>Cancel</button>
        
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
        
                    </div>
                );
            } else {
                return ( 
                    <div className="container">
                <br></br><br></br>
            <div className="row row-primary ">
            
            <div className="card col-md-4 offset-md-4 offset-md-4 ">
            <div className="card-body">
            <form>
            <div className="form-group">
            <h3 className="text-center text-muted"> You have no access to this!</h3>
            </div>
            <br></br><br></br>
           </form> 
           </div>
           </div> 
           </div> 
           </div>
                );
            }
    
    }
}

export default UpdateApplicationComponent;