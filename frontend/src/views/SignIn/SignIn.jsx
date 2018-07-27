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
        let regex = /^[a-zA-z0-9_\.]{1,30}@{1,}[a-z]{3,10}\.{1}[a-z]{2,9}(\.[a-z]{2,3}|)$/gm;
        let validEmail = regex.test(email.value)
        if(!validEmail) {
            email.value = 'Incorrect Email. Try again'
            return null
        }
        let signInUser = {
            email: email.value,
            pass: pass.value
        }
       this.props.signUser(signInUser, 'signin')
       email.value = pass.value= '';
    }

    clearInput=(e)=>{
        if(!e.target.value) return null
        if(e.target.value.indexOf('Incorrect Email. Try again')>=0){
            e.target.value = ''
        }
    }

    render() {
        const {classes, user} = this.props;
        const toVerify = (user === 'notverified') ? 
                        ' YOU HAVE ALREADY REGISTERED. CHECK YOUR EMAIL FOR VERIFICATION' : null
        const tip = (user==='nouser') ? 'YOU ARE NOT REGISTERED. PEASE SIGN UP' : null

        return(
            <Fragment>
                
                <Card className={classes.cardMain}>
                    <CardHeader color="primary">
                        <h3>Sign into Home Expense App</h3>
                        <h5>Please enter your email and password</h5>
                    </CardHeader>
                    <CardBody className={classes.cardBody}>
                        <TextField label='Enter Email' onClick={this.clearInput}/>
                        <TextField label='Enter password'/>
                        <Button variant='outlined' 
                                color='primary'
                                onClick={this.signInClick}>Sign In</Button>
                        <Link to='/signup'>first-time user? Sign up</Link>
                        <Paper>
                            {tip || toVerify}
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