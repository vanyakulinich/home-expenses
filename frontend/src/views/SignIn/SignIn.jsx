import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Button} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import signIn from '../../actions/signIn.jsx'

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

class SignIn extends Component {
    constructor(props){
        super(props)
    }

    signInClick =()=> {
        let [email, pass] = document.querySelectorAll('[type="text"]');
        console.log(email.value, pass.value);
        let user = {
            email: email.value,
            password: pass.value
        }
       this.props.signIn(user)
    }

    render() {
        const {classes} = this.props;
        return(
            <Card className={classes.cardMain}>
                <CardHeader color="primary">
                    <h3>Sign into Home Expense App</h3>
                    <h5>Please enter your email and password</h5>
                </CardHeader>
                <CardBody className={classes.cardBody}>
                    <TextField label='Enter Email' className = 'userInputs'/>
                    <TextField label='Enter password' className = 'userInputs'/>
                    <Button variant='outlined' 
                            color='primary'
                            onClick={this.signInClick}>Sign In</Button>
                    <Link to='/signup'>first-time user? Sign up</Link>
                </CardBody>
            </Card>
        )
    }
    
}

const mapActionsToProps = {
    signIn
}

export default connect(null, mapActionsToProps)(withStyles(styles)(SignIn));