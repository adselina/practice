import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';


interface SerchEnterpriseDataState {

    title: string;
    loading: boolean;
    fieldList: Array<any>;
    selectedFild: string;
    selectedValue: string;
}

export class SerchEnterprise extends React.Component<{ Search: any, Remove: any }, SerchEnterpriseDataState> {
    constructor(props: any) {
        super(props);

        this.state = {
            title: "searchEnterprise", loading: false, fieldList: [], selectedFild: "", selectedValue: ""
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSerchForm();

        return <div>
            {contents}
        </div>;
    }

 
    private handleSearch(event: any) {
        event.preventDefault();
        console.log(event.target.field.value, event.target.value.value);
        this.props.Search(event.target.field.value, event.target.value.value);

    }
    private renderSerchForm() {
        return (
            <form onSubmit={this.handleSearch}>

                <div className="row" >
                    <div className="col-md-5">
                        <select className="form-control" data-val="true" name="field" required>
                            <option value="">-- Выберите параметр для поиска--</option>
                            <option value="Companyname">Компания</option>
                            <option value="Contact">Телефон</option>
                            <option value="Head">Руководитель</option>
                        </select>
                    </div>

                    <input className="form-control col-md-5" type="text" name="value" required />
                    <button type="submit" className="btn btn-primary col ml-2">Поиск...</button>
                    <button type="button" className="btn btn-outline-primary col ml-2" onClick={() => this.props.Remove()}>X</button>


                </div>
            </form>)
    }
}