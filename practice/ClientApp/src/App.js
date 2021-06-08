import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Database } from './components/Database';
import { AddStaff } from './components/AddStaff';
import { AddEnterprise } from './components/AddEnterprise';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/database' component={Database} />

                <Route path='/addstaff' component={AddStaff} />
                <Route path='/staff/edit/:empid' component={AddStaff} />

                <Route path='/addenterprise' component={AddEnterprise} />
                <Route path='/enterprise/edit/:empid' component={AddEnterprise} />
            </Layout>
        );
    }
}
