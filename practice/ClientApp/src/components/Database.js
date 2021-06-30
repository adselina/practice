import { Component } from 'react';
import * as React from 'react';
import { FetchEnterprise } from './FetchEnterprise';
import { FetchStaff } from './FetchStaff';
import { FetchManufacture } from './FetchManufacture';
import { ListOfComponents } from './ListOfComponents';

export class Database extends Component {

    constructor(props) {
        super(props); 
        const query = new URLSearchParams(this.props.location.search);
        const table = query.get('type') || "Предприятия";
        this.state = { currentTable: table };
    }

    switchTable() {

        switch (this.state.currentTable) {
            case "Предприятия":
                return <FetchEnterprise />
                break;
            case "Сотрудники":
                return <FetchStaff />
                break;
            case "Производства":
                return <FetchManufacture />
                break;
        }
    }
   render() {
        return (
                <div className="row">
                    <div style={{marginLeft:'18px'} } className="col-md-2.7 pull-md-3">
                        <ListOfComponents setTable={(name) => { this.setState({ currentTable: name }) }} />
                    </div>
                    <div style={{ marginLeft: '25px' }} className="col-md-10 pull-md-3">
                        {this.switchTable()}
                    </div>
                </div>           
        );
    }
}

