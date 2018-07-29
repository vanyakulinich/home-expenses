import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Button, Paper} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import signUpUser from '../../actions/signUpUser.jsx'

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
        let [email, pass, rePass]  = document.querySelectorAll('[type="text"]');
        let regex = /^[a-zA-z0-9_.]{1,30}@{1,}[a-z]{3,10}\.{1}[a-z]{2,9}(.[a-z]{2,3}|)$/gm;
        let validEmail = regex.test(email.value);
        if(!validEmail) {
            email.value = 'Incorrect Email. Try again';
            return null;
        }
       
        if(pass.value === rePass.value) {
            let newUser = {
                email: email.value,
                pass: pass.value
            }
            this.props.signUpUser(newUser)
            email.value = pass.value = rePass.value = '';
        } 
    }

    clearInput=(e)=>{
        if(!e.target.value) return null
        if(e.target.value.indexOf('Incorrect Email. Try again')>=0){
            e.target.value = '';
        }
    }

    render(){
        const {classes, user} = this.props;
        const isUser = (user==='isuser') ? 'YOU ARE ALREADY REGISTERED.PLEASE SIGN IN' : null
        const toVerify = (user === 'notverified') ? 'CHECK YOUR EMAIL FOR VERIFICATION' : null 

        return(
    
        <Card className={classes.cardMain}>
            <CardHeader color="primary">
                <h3>Register in Home Expense App</h3>
                <h5>Please enter your email and password</h5>
            </CardHeader>
            <CardBody className={classes.cardBody}>
                <TextField label='Enter Email' onClick={this.clearInput}/>
                <TextField label='Enter password'/>
                <TextField label='Repeat password'/>
                <Button variant='outlined' 
                        color='primary'
                        onClick={this.userInput}>Sign Up</Button>
                <Link to='/signin'>already have an account? Sign in</Link>
                <Paper>
                    { isUser || toVerify}
                </Paper>
            </CardBody>
        </Card>
        )
    }
}
const mapStateToProps = state =>({
    user: state.user
})
const mapActionsToProps = {
    signUpUser
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignUp));