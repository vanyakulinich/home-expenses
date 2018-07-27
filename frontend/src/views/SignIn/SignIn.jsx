import React, {Fragment, Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Button, Paper} from "@material-ui/core";
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

class SignIn extends Component {
   
    signInClick =()=> {
        let [email, pass] = document.querySelectorAll('[type="text"]');
        let signInUser = {
            email: email.value,
            pass: pass.value
        }
       this.props.signUser(signInUser, 'signin')
       email.value = pass.value= '';
    }

    render() {
        const {classes, user} = this.props;

        const tip = (user==='nouser') ? 'Please check your input or sign up' : null

        return(
            <Fragment>
                
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
                        <Paper>
                            {tip}
                        </Paper>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
    
}

const mapStateToProps = state=>({
    user: state.user
})

const mapActionsToProps = {
    signUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignIn));