import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { SerchStaff } from './SerchStaff';

interface FetchStaffDataState {
   
    stafflist: StaffData[];
    searchList: StaffData[];
    loading: boolean;
}

export class FetchStaff extends React.Component<RouteComponentProps<{}>, FetchStaffDataState> {
    constructor(props: any) {
        super(props);
        this.state = { searchList: [], stafflist: [], loading: true, };

        if (this.state.stafflist.length == 0) {
            fetch('api/staff')
                .then(response => response.json() as Promise<StaffData[]>)
                .then(data => {
                    this.setState({ searchList:data, stafflist: data, loading: false });
                });
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    public render() {
       
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStaffTable(this.state.searchList);

        return (<div>
            <h1>Сотрудники</h1>
            <div>
                <Link to="/addstaff">Добавить...</Link>
                {<SerchStaff Search={(type: string, value: string) => this.ChangeSerch(type, value)} Remove={()=>this.RemoveSearch()} />}
            </div>
            
            {contents}
        </div>);
    }

    ChangeSerch(type: string, value: string) {
        console.log(type, value);
        this.setState({ loading: true })
        fetch(`api/staff/${type}-${value}`)
            .then(response => response.json() as Promise<StaffData[]>)
            .then(data => {
                this.setState({ searchList: data, loading: false });
            });
    }
    RemoveSearch() {
        this.setState({ searchList: this.state.stafflist});
    }

    // Handle Delete request for an employee
    private handleDelete(id: number) {
        if (!window.confirm("Вы действительно хотите удалить запись о данном сотруднике? " + id))
            return;
        else {
            fetch('api/staff/' + id, {
                method: 'delete'
            }).then(data => {

                this.setState(
                    {
                        stafflist: this.state.stafflist.filter((rec) => {
                            return (rec.id != id);
                        }
                     )
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/staff/edit/"+id);
    }

    // Returns the HTML table to the render() method.  
    renderStaffTable(stf: StaffData[]) {
        return <table className='table'>
            <thead>
                <tr style={{textAlign: 'center' }}>
                    <th></th>
                    <th>ФИО</th>
                    <th>Место работы</th>
                    <th style={{ width: '17%' }}>Должность</th>
                    <th style={{ width: '18%' }}>Дата рождения</th>
                    <th style={{ width: '18%' }}>Дата найма</th>
                    <th>Телефон</th>
                </tr>
            </thead>
            <tbody>
                {stf.map(e =>
                    <tr style={{ textAlign: 'center' }} key={e.id}>
                        <td></td>
                        <td>{e.name}</td>
                        <td>{e.company}</td>
                        <td>{e.post}</td>
                        <td>{e.dateOfBirth.toString().split('T')[0]}</td>
                        <td>{e.dateOfHire.toString().split('T')[0]}</td>
                        <td>{e.contact}</td>
                        <td>
                            <Link to={"/staff/edit/" + e.id}>Изменить</Link>
                            <a className="action" onClick={(id) => this.handleDelete(e.id)}>
                                <Link to={""}> Удалить</Link>
                            </a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class StaffData {
    id: number = 0;
    name: string = "";
    company: string = "";
    post: string = "";
    dateOfBirth: Date = new Date(Date.now());
    dateOfHire: Date = new Date(Date.now());
    contact: string = "";
}