import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchEnterpriseDataState {
    entList: EnterpriseData[];
    loading: boolean;
}

export class FetchEnterprise extends React.Component<RouteComponentProps<{}>, FetchEnterpriseDataState> {
    constructor(props: any) {
        super(props);
        this.state = { entList: [], loading: true };

        fetch('api/enterprise')
            .then(response => response.json() as Promise<EnterpriseData[]>)
            .then(data => {
                this.setState({ entList: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        //this.handleEdit = this.handleEdit.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEnterpriseTable(this.state.entList);

        return <div>
            <h1>Предприятия</h1>
            <p>
                <Link to="/addenterprise">Добавить...</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an employee  
    private handleDelete(id: number) {
        if (!window.confirm("Вы действительно хотите удалить данные об предприятии?"))
            return;
        else {
            fetch('api/enterprise/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        entList: this.state.entList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    // Returns the HTML table to the render() method.  
    renderEnterpriseTable(ent: any) {
        return <table className='table'>
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    <th></th>
                    <th>Компания</th>
                    <th>Руководитель</th>
                    <th>Телефон</th>
                    <th>Почта</th>
                    <th>ИНН</th>
                    <th>ОГРН</th>
                </tr>
            </thead>
            <tbody>
                {ent.map(e =>                  
                    <tr style={{ textAlign: 'center' }} key={e.id}>
                        <td></td>
                        <td>{e.name}</td>
                        <td>{e.head}</td>
                        <td>{e.contact}</td>
                        <td>{e.email}</td>
                        <td>{e.inn}</td>
                        <td>{e.ogrn}</td>
                        <td>
                            <Link to={"/enterprise/edit/" + e.id}>Изменить</Link> 
                            <div className="action" onClick={(id) => this.handleDelete(e.id)}>
                                <Link to={""}> Удалить</Link>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class EnterpriseData {
    id: number = 0;
    name: string = "";
    head: string = "";
    contact: string = "";
    email: string = "";
    inn: string = "";
    ogrn: string = "";
}