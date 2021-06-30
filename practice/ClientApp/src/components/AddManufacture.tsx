import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ManufactureData } from './FetchManufacture';



interface AddManufactureDataState {

    title: any;
    loading: boolean;
    enterpriseList: Array<any>;
    typeList: Array<any>;
    staffList: Array<any>;
    mData: ManufactureData;
}

export class AddManufacture extends React.Component<RouteComponentProps<{}>, AddManufactureDataState> {
    constructor(props: any) {
        super(props);

        this.state = {
            title: window.location.pathname.split("/").pop(), loading: true, staffList: [], typeList: [], enterpriseList:[], mData: new ManufactureData
        };

        //Всех сотрудников
        fetch('api/staff')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ staffList: data });
            });
        //Все виды производств
        fetch('api/manufacturetype')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ typeList: data });
            });
        //Все предприятия
        fetch('api/allenterprise')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ enterpriseList: data });
            });
        console.log(this.state.enterpriseList)

        let empid = this.props.match.params["empid"];

        if (this.state.title == "addmanufacture") {
            this.state = { title: "create", loading: false, staffList: [], enterpriseList:[], typeList:[], mData: new ManufactureData };
        }
        else (fetch('api/manufacture/edit/' + empid)
            .then(response => response.json() as Promise<ManufactureData>)
            .then(data => {
                this.setState({ title: "edit", loading: false, mData: data })
            }))

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.staffList, this.state.typeList, this.state.enterpriseList);

        return <div>
            <h2>Производства</h2>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.  
        if (this.state.mData.id) {
            fetch('api/manufacture/edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/database?type=Производства");
                })
        }

        // POST request for Add employee.  
        else {
            fetch('api/manufacture/create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/database?type=Производства");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/database?type=Производства");
    }
    private onlyNumbers(e: any) {
        const re = /[0-9]+/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    // Returns the HTML Form to the render() method.  
    private renderCreateForm(staffList: Array<any>, typeList: Array<any>, entList: Array<any>) {

        return (
            <form onSubmit={this.handleSave} >

                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.mData.id} />
                </div>

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Наименование</label>
                    <div className="col-md-5">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.mData.name} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="head">Руководитель</label>
                    <div className="col-md-5">

                        <select className="form-control" data-val="true" name="head" defaultValue={this.state.mData.head} required >
                            <option value="">-- Выберите сотрудника --</option>
                            {staffList.map(staff =>
                                <option key={staff.id} value={staff.name}>{staff.name}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="type">Вид производства</label>
                    <div className="col-md-5">
                        
                        <select className="form-control" data-val="true" name="type" defaultValue={this.state.mData.type} required >
                            <option value="">-- Выберите вид производства --</option>
                            {typeList.map(typ =>
                                <option key={typ.id} value={typ.manufactureTypeName}>{typ.manufactureTypeName}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="enterprise">Предприятие</label>
                    <div className="col-md-5">

                        <select className="form-control" data-val="true" name="enterprise" defaultValue={this.state.mData.enterprise} required >
                            <option value="">-- Выберите предприятие, которому пренадлежит производство --</option>
                            {
                                entList.map(ent =>
                                <option key={ent.id} value={ent.enterpriseNameS}>{ent.enterpriseNameS}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="contact">Телефон</label>
                    <div className="col-md-5">
                        <input className="form-control" minLength={11} maxLength={11} type="text"
                            name="contact" onKeyPress={(e) => this.onlyNumbers(e)} defaultValue={this.state.mData.contact} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="email">Почта</label>
                    <div className="col-md-5">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.mData.email} required />
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