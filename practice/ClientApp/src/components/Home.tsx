import * as React from 'react';
import { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>Навигатор</h1>
                    <h6>|  создавайте  |  просматривайте  |  редактируйте  |  удаляйте  |</h6>
                </div>

                <p>Начните работать уже сейчас:</p>
                <ul>
                    <li><strong>Руководство пользователя</strong>.</li>
                    <li><strong>Техническая документация</strong>.</li>
                </ul>

                <footer>
                    <div style={{ position: 'fixed', bottom: '0', marginBottom: '10px' }}> &copy; Селина А.Д. 2021. HSE.</div>
                </footer>
              
            </div>
            
        );
    }
}