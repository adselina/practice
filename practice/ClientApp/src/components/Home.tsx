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

                    <li><a href="https://drive.google.com/file/d/13s2QpVu0YxJB1UPjUIKj7y0k1KHX5LOH/view?usp=sharing"><strong>Руководство пользователя</strong>.</a></li>
                    <li><a href="https://drive.google.com/file/d/1fXdCM8idqe2_BC2ZEDMg-3fsS0URsmn7/view?usp=sharing"><strong>Техническое задание</strong>.</a></li>
                </ul>
                <div style={{bottom: '0', marginBottom: '10px', textAlign: 'center', alignContent: 'center'}}>
                    <img style={{ width: '70%', height: '70%'}}src="https://lh3.googleusercontent.com/proxy/nFy7XDH1bfkWVQzZjD0EWx29_QCt5NpO8ayVbPBD-GzjUD8tqmktXCoRvUSOuybetFbbivOWSNKe8Ov9TnEWAkExGRRUByS_2JBRqxVXmcGhzOHlCWyLn6oafqybV-e6ios"></img>
                    </div>
                    <footer>
                    <div style={{ position: 'fixed', bottom: '0', marginBottom: '10px'}}> &copy; Селина А.Д. 2021. HSE.</div>
                </footer>
              
            </div>
            
        );
    }
}