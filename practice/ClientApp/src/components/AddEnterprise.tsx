import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EnterpriseData } from './FetchEnterprise';


interface AddEnterpriseDataState {

    title: any;
    loading: boolean;
    staffList: Array<any>;
    entData: EnterpriseData;
}

export class AddEnterprise extends React.Component<RouteComponentProps<{}>, AddEnterpriseDataState> {
    constructor(props: any) {
        super(props);

        this.state = {
            title: window.location.pathname.split("/").pop(), loading: true, staffList: [], entData: new EnterpriseData
        };

        //Всех сотрудников
        fetch('api/staff')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ staffList: data });
            });

        var empid = this.props.match.params["empid"];

        if (this.state.title == "addenterprise") {
            this.state = { title: "create", loading: false, staffList: [], entData: new EnterpriseData };
        }
        else (fetch('api/enterprise/edit/' + empid)
            .then(response => response.json() as Promise<EnterpriseData>)
            .then(data => {
                this.setState({ title: "edit", loading: false, entData: data })
            }))

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.staffList);

        return <div>
            <h2>Предприятия</h2>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.  
        if (this.state.entData.id) {
            fetch('api/enterprise/edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/database?type=Предприятия");
                })
        }

        // POST request for Add employee.  
        else {
            fetch('api/enterprise/create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/database?type=Предприятия");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/database?type=Предприятия");
    }
    private onlyNumbers(e) {
        const re = /[0-9]+/;
            if (!re.test(e.key)) {
                e.preventDefault();
            }
    };

    // Returns the HTML Form to the render() method.  
    private renderCreateForm(staffList: Array<any>) {

        return (
            <form onSubmit={this.handleSave} >

                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.entData.id} />
                </div>

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Наименование</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.entData.name} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="head">Руководитель</label>
                    <div className="col-md-4">

                        <select className="form-control" data-val="true" name="head" defaultValue={this.state.entData.head} required >
                            <option value="">-- Выберите сотрудника --</option>
                            {staffList.map(staff =>
                                <option key={staff.id} value={staff.name}>{staff.name}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="contact">Телефон</label>
                    <div className="col-md-4">
                        <input className="form-control" minLength={11} maxLength={11} type="text"
                           name="contact" onKeyPress={(e) => this.onlyNumbers(e)} defaultValue={this.state.entData.contact} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="email">Почта</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.entData.email} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="inn">ИНН (10 цифр)</label>
                    <div className="col-md-4">
                        <input className="form-control" minLength={10} maxLength={10} type="text"
                            onKeyPress={(e) => this.onlyNumbers(e)} name="inn" defaultValue={this.state.entData.inn} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="ogrn">ОГРН (13 цифр)</label>
                    <div className="col-md-4">
                        <input className="form-control" minLength={13} maxLength={13} type="text"
                            onKeyPress={(e) => this.onlyNumbers(e)} name="ogrn" defaultValue={this.state.entData.ogrn} required />
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