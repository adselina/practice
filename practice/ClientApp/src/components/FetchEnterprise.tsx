﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { SerchEnterprise } from './SerchEnterprise';

interface FetchEnterpriseDataState {
    entList: EnterpriseData[];
    searchList: EnterpriseData[];
    loading: boolean;
}

export class FetchEnterprise extends React.Component<RouteComponentProps<{}>, FetchEnterpriseDataState> {
    constructor(props: any) {
        super(props);
        this.state = { searchList: [], entList: [], loading: true };
        if (this.state.entList.length == 0) {
            fetch('api/enterprise')
                .then(response => response.json() as Promise<EnterpriseData[]>)
                .then(data => {
                    this.setState({ searchList: data, entList: data, loading: false });

                });
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEnterpriseTable(this.state.searchList);

        return (<div>
            <h1>Предприятия</h1>
            <div>
                <Link to="/addenterprise">Добавить...</Link>
                {<SerchEnterprise Search={(type: string, value: string) => this.ChangeSerch(type, value)} Remove={() => this.RemoveSearch()} />}
            </div>

            {contents}
        </div>);
    }

    ChangeSerch(type: string, value: string) {
        console.log(type, value);
        this.setState({ loading: true })
        fetch(`api/enterprise/${type}-${value}`)
            .then(response => response.json() as Promise<EnterpriseData[]>)
            .then(data => {
                this.setState({ searchList: data, loading: false });
            });
    }
    RemoveSearch() {
        this.setState({ searchList: this.state.entList });
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
                        searchList: this.state.entList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
            
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/enterprise/edit/" + id);
    }

    // Returns the HTML table to the render() method.  
    renderEnterpriseTable(ent: EnterpriseData[]) {
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
                                <Link to={"/database?type=Предприятия"}> Удалить</Link>
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