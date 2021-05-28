import React, { Component } from 'react';
import { FetchEnterprise } from './FetchEnterprise';
import { FetchStaff } from './FetchStaff';

import { ListOfComponents } from './ListOfComponents';



export class Database extends Component {

    constructor(props) {
        super(props);
        this.state = { currentTable: "Предприятия" };
    }

    switchTable() {
        switch (this.state.currentTable) {
            case "Предприятия":
                return <FetchEnterprise />
                break;
            case "Персонал":
                return <FetchStaff />
                break;
        }
    }
   render() {
        return (
                <div class="row">
                <div class="col-md-2.5 col-md-push-8">
                    <ListOfComponents setTable={(name) => { this.setState({ currentTable: name }) }} />
                    </div>
                <div class="col-md-9 col-md-pull-3">
                    {this.switchTable()}
                    </div>
                </div>           
        );
    }
}

