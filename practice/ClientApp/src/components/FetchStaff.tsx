import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Database } from './Database';

interface FetchStaffDataState {
    stafflist: StaffData[];
    loading: boolean;
}

export class FetchStaff extends React.Component<RouteComponentProps<{}>, FetchStaffDataState> {
    constructor(props) {
        super(props);
        this.state = { stafflist: [], loading: true };

        fetch('api/staff')
            .then(response => response.json() as Promise<StaffData[]>)
            .then(data => {
                this.setState({ stafflist: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        /*this.handleEdit = this.handleEdit.bind(this);*/

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStaffTable(this.state.stafflist);

        return <div>
            <h1>Сотрудники</h1>
            <p>
                <Link to="/addenterprise">Добавить...</Link>
            </p>
            {contents}
        </div>;
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

    //private handleEdit(id: number) {
    //    this.props.history.push("/staff/edit/" + id);
    //}

    // Returns the HTML table to the render() method.  
    renderStaffTable(stf: StaffData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>ФИО</th>
                    <th>Место работы</th>
                    <th>Должность</th>
                    <th>Дата рождения</th>
                    <th>Дата найма</th>
                    <th>Телефон</th>
                </tr>
            </thead>
            <tbody>
                {stf.map(e =>
                    <tr key={e.id}>
                        <td></td>
                        <td>{e.name}</td>
                        <td>{e.company}</td>
                        <td>{e.post}</td>
                        <td>{e.dateOfBirth}</td>
                        <td>{e.dateOfHire}</td>
                        <td>{e.contact}</td>
                        <td>
                            {/*<a className="action" onClick={(id) => this.handleEdit(e.id)}>Изменить</a>  |*/}
                            <a className="action" onClick={(id) => this.handleDelete(e.id)}>Удалить</a>
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
    dateOfBirth: string = "";
    dateOfHire: string = "";
    contact: string = "";
}