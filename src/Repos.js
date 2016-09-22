/**
 * Created by luyuann on 9/21/2016.
 */
import React, {Component} from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router';

class Repos extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            repositories:[]
        }
    }
    componentDidMount(){
        fetch('https://api.github.com/users/pro-react/reposg')
            .then((response)=>{
                if(response.ok) return response.json();
                else throw new Error('Server response wan\'t ok');
            })
            .then((responseData)=>{
                console.log(responseData);
                this.setState({repositories:responseData});
            })
            .catch((error) => {
                this.props.history.pushState(null,'/error');
            });
    }
    render(){
        let repos =  this.state.repositories.map((repo)=>{
            console.log(repo);
            return (<li key={repo.id}><Link to={"/repo/"+repo.name}>{repo.name}</Link></li>
        )});
        let child = this.props.children&&React.cloneElement(this.props.children,{repositories:this.state.repositories});

        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
                {child}
            </div>)
    }
}

export default Repos;