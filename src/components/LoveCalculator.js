import React from 'react';
import axios from 'axios';
import './LoveCalculator.css';

class LoveCalculator extends React.Component {
    constructor(){
        super();
        this.state = {
            name : "",
            crush  : "",
            percentage : 0,
            message    : ""
        }
        this.calculateLove = this.calculateLove.bind(this);
        this.setName = this.setName.bind(this);
        this.setCrush = this.setCrush.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    calculateLove( event ){
        this.setState({
            percentage: 0,
            message: "Loading..."
        });
        const url = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + this.state.name + "&sname=" + this.state.crush;
        const config = {
            headers: {
                "x-rapidapi-host": "love-calculator.p.rapidapi.com",
                "x-rapidapi-key": "PUT_YOUR_API_KEY_HERE"
            }
        }
        axios.get(url, config)
            .then( data => {
                console.log(data);
                this.setState({
                    percentage: data.data.percentage,
                    message: data.data.result
                })
            })
            .catch( error => {
                console.error(error);
                this.setState({
                    percentage: 0,
                    message: "Loading problem, try again"
                })
            })
    }

    setName(event){
        this.setState({
            name : event.target.value
        });
    }
    setCrush(event){
        this.setState({
            crush: event.target.value
        });
    }
    clearInput(event){
        event.target.value = '';
    }

    render(){
        return(
            <div className="columns">
                <div className="column">
                    <h1 className="title">Love Calculator</h1>
                    <Input onAction={this.setName} focus={this.clearInput} name="Your Name"/>
                    <LoveIcon/>
                    <Input onAction={this.setCrush} focus={this.clearInput} name="Your crush"/>
                    <button onClick={this.calculateLove}>Calculate Your Love</button>
                    <Percentage>
                        { this.state.percentage }%
                    </Percentage>
                    <Message>
                        { this.state.message }
                    </Message>
                </div>
            </div>
        );
    }
}

function Input( {onAction, focus, name} ){
    return(
        <input type="text" onChange={onAction} onFocus={focus} placeholder={name}/>
    )
}

function Percentage( {children} ){
    return (
        <div className="percentage">
            { children }
        </div>
    );
}

function Message( {children} ){
    return (
        <div className="message">
            { children }
        </div>
    );
}

function LoveIcon(){
    return(
        <i className="fas fa-heart"></i>
    )
}

export default LoveCalculator;