import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

interface FetchList {
    number_of_components: Int8Array[];
    loading: boolean;
}

export class ListOfComponents extends React.Component<RouteComponentProps<{}>, FetchList> {
    constructor(props) {
        super(props);
        this.state = { number_of_components: [], loading: true };

        fetch('api/List')
            .then(response => response.json())
            .then(data => {
                this.setState({ number_of_components: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderListOfComponents(this.state.number_of_components);

        return(
        <div>
           {contents}
        </div>);
            }

            // Returns the HTML table to the render() method.  
    
    renderListOfComponents(comp) {
        return (
            <ListGroup>
                {Object.entries(comp).map(([key, value]) =>
                    <ListGroupItem onClick={()=>this.props.setTable(key)} className="justify-content-between" tag={Link} > {key}
                        <Badge pill> {value} </Badge>
                     
                    </ListGroupItem>)}
            </ListGroup>
            )
    }
}