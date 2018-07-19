import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Button} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import signUser from '../../actions/signUser.jsx'


const styles = {
    cardMain: {
        width: '500px'
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        height: '300px'

    }
}

class SignUp extends Component {
    
    userInput = ()=>{
        let [email, pass, rePass]  = document.querySelectorAll('[type="text"]')
        console.log(email.value, pass.value, rePass.value)

        if(pass.value === rePass.value) {
            let newUser = {
                email: email.value,
                pass: pass.value
            }
            // this.props.signUser(newUser, 'signup')
        } else {
            console.log('no')
        }

    }


    render(){
        const {classes} = this.props;
        return(
        <Card className={classes.cardMain}>
            <CardHeader color="primary">
                <h3>Sign into Home Expense App</h3>
                <h5>Please enter your email and password</h5>
            </CardHeader>
            <CardBody className={classes.cardBody}>
                <TextField label='Enter Email'/>
                <TextField label='Enter password'/>
                <TextField label='Repeat password'/>
                <Button variant='outlined' 
                        color='primary'
                        onClick={this.userInput}>Sign Up</Button>
                <Link to='/signin'>already have an account? Sign in</Link>
            </CardBody>
        </Card>
        )
    }
}

const mapActionsToProps = {
    signUser
}


export default connect(null, mapActionsToProps)(withStyles(styles)(SignUp));