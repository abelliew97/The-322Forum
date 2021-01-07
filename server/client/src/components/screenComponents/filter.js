import React, { Component,useState } from "react";
import { withRouter } from "react-router-dom";
import { RadioGroup, RadioButton } from 'react-radio-buttons';


class Filter extends React.Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
        <RadioGroup onChange={e => {
            if(e == "all"){    //All posts{}
                this.nextPath('/')
                localStorage.setItem("filter", "all")
            }
            else{
                this.nextPath('/followingPost')
                localStorage.setItem("filter", "followed")
            } 
        }}  horizontal>
            <RadioButton value="all" checked={localStorage.getItem("filter") == "all"? true : false} >
                All
            </RadioButton>
            <RadioButton value="following" checked={localStorage.getItem("filter") == "all"? false : true}>
                Following
            </RadioButton>

        </RadioGroup>
        );
    }
}

export default withRouter(Filter);