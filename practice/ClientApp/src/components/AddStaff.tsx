import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { StaffData } from './FetchStaff';


interface AddStaffDataState {

    title:any;
    loading: boolean;
    postsList: Array<any>;
    companyList: Array<any>;
    empData: StaffData;
}

export class AddStaff extends React.Component<RouteComponentProps<{}>, AddStaffDataState> {
    constructor(props: any) {
        super(props);

        this.state = {
            title: window.location.pathname.split("/").pop(), loading: true, postsList: [], companyList: [], empData: new StaffData};

        fetch('api/post')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ postsList: data });
            });

        fetch('api/company')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ companyList: data });
            });

        var empid = this.props.match.params["empid"];

        if (this.state.title == "addstaff") {
            this.state = { title: "create", loading: false, postsList: [], companyList: [], empData: new StaffData };
        }
        else (fetch('api/staff/edit/' + empid)
            .then(response => response.json() as Promise<StaffData>)
            .then(data => {
                this.setState({ title: "edit", loading: false, empData: data })
            }))        

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.postsList, this.state.companyList);

        return <div>
            <h2>Сотрудники</h2>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event : any) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.  
        if (this.state.empData.id) {
            fetch('api/staff/edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/database?type=Персонал" );
                })
        }

        // POST request for Add employee.  
        else {
            fetch('api/staff/create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/database?type=Персонал");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/database?type=Персонал");
    }
    private onlyNumbers(e) {
        const re = /[0-9]+/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };
    // Returns the HTML Form to the render() method.  
    private renderCreateForm(postsList: Array<any>, companyList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.empData.id} />
                </div>

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">ФИО</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="dateOfBirth">Дата рождения</label>
                    <div className="col-md-4">
                        <input type="date" name="dateOfBirth" defaultValue={this.state.empData.dateOfBirth.toString().split('T')[0]} required />
                    </div>
                </div >

                <div  className="form-group row">
                    <label className="control-label col-md-12" htmlFor=" dateOfHire" >Дата принятия на работу</label>
                    <div className="col-md-4" >
                        <input type="date" name="dateOfHire" defaultValue={this.state.empData.dateOfHire.toString().split('T')[0]} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="contact">Номер телефона</label>
                    <div className="col-md-4">
                        <input className="form-control" minLength={11} maxLength={11} type="text" onKeyPress={(e) => this.onlyNumbers(e)} name="contact" defaultValue={this.state.empData.contact} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="post">Должность</label>
                    <div className="col-md-4">

                        <select className="form-control" data-val="true" name="post" defaultValue={this.state.empData.post} required >
                            <option value="">-- Выберите должность --</option>
                            {postsList.map(post =>
                                <option key={post.id} value={post.postname}>{post.postname}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="company">Место работы</label>
                    <div className="col-md-4">

                        <select className="form-control" data-val="true" name="company" defaultValue={this.state.empData.company} required>
                            <option value="">-- Выберите место работы--</option>
                            {companyList.map(comp =>
                                <option key={comp.id} value={comp.techObjectName}>{comp.techObjectName}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Сохранить</button>
                    <button className="btn" onClick={this.handleCancel}>Отмена</button>
                </div >
            </form >
        )
    }
}