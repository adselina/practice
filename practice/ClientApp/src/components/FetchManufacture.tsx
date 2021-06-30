import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { SerchManufacture } from './SerchManufacture';

interface FetchManufactureDataState {
    mList: ManufactureData[];
    searchList: ManufactureData[];
    loading: boolean;
}

export class FetchManufacture extends React.Component<RouteComponentProps<{}>, FetchManufactureDataState> {
    constructor(props: any) {
        super(props);
        this.state = { searchList: [], mList: [], loading: true };
        if (this.state.mList.length == 0) {
            fetch('api/manufacture')
                .then(response => response.json() as Promise<ManufactureData[]>)
                .then(data => {
                    this.setState({ searchList: data, mList: data, loading: false });
                });
            console.log("done");
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderManufactureTable(this.state.searchList);

        return (<div>
            <h1>Производства</h1>
            <div>
                <Link to="/addmanufacture">Добавить...</Link>
                {<SerchManufacture Search={(type: string, value: string) => this.ChangeSerch(type, value)} Remove={() => this.RemoveSearch()} />}
            </div>

            {contents}
        </div>);
    }

    ChangeSerch(type: string, value: string) {
        console.log(type, value);
        this.setState({ loading: true })
        fetch(`api/manufacture/${type}-${value}`)
            .then(response => response.json() as Promise<ManufactureData[]>)
            .then(data => {
                this.setState({ searchList: data, loading: false });
            });
    }
    RemoveSearch() {
        this.setState({ searchList: this.state.mList });
    }

    // Handle Delete request for an employee  
    private handleDelete(id: number) {
        if (!window.confirm("Вы действительно хотите удалить данные об предприятии?"))
            return;
        else {
            fetch('api/manufacture/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        searchList: this.state.mList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/manufacture/edit/" + id);
    }

    // Returns the HTML table to the render() method.  
    renderManufactureTable(ent: ManufactureData[]) {
        return <table className='table'>
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    <th></th>
                    <th>Производство</th>
                    <th>Вид</th>
                    <th>Предприятие</th>
                    <th>Телефон</th>
                    <th>Руководитель</th>
                    <th>Кол-во сооружений</th>
                    <th>Кол-во тех.объектов</th>
                </tr>
            </thead>
            <tbody>
                {ent.map(e =>
                    <tr style={{ textAlign: 'center' }} key={e.id}>
                        <td></td>
                        <td>{e.name}</td>
                        <td>{e.type}</td>
                        <td>{e.enterprise}</td>
                        <td>{e.contact}</td>
                        <td>{e.head}</td>
                        <td>{e.c_building}</td>
                        <td>{e.c_techobj}</td>
                        <td>
                            <Link to={"/manufacture/edit/" + e.id}>Изменить</Link>
                            <div className="action" onClick={(id) => this.handleDelete(e.id)}>
                                <Link to={"/database?type=Производство"}> Удалить</Link>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class ManufactureData {
    id: number = 0;
    name: string = "";
    head: string = "-";
    enterprise: string = "";
    contact: string = "";
    email: string = "";
    type: string = "";
    c_building: number = 0;
    c_techobj: number = 0;
}