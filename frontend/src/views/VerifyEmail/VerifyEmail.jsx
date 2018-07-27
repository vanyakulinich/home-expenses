import React, {Fragment, Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Button} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {Link} from "react-router-dom";
import signUser from '../../actions/signUser.jsx';
import {connect} from 'react-redux';

const styles = {
    cardMain: {
        width: '500px'
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        height: '300px',
    }
};
const inputDisabled = {
    disabled: true,
}
class VerifyEmail extends Component {

    verifyUser =()=>{
        let [email, verifyKey] = document.querySelectorAll('[type="text"]');
        let verifyUser = {
            email: email.value,
            verifyKey: verifyKey.value
        };
        
        email.value = verifyKey.value= '';
        this.props.signUser(verifyUser, 'verify');
    }

    render(){
        const {classes} = this.props;
        return (
            <Fragment>
                <Card className={classes.cardMain}>
                    <CardHeader color="primary">
                        <h3>Email verification to finish registration with Home Expense App</h3>
                        <h5>Please confirm email address</h5>
                    </CardHeader>
                    <CardBody className={classes.cardBody}>
                        <TextField label='Email address' 
                        defaultValue = {this.props.match.params.email}
                        InputProps={inputDisabled}/>
                        <TextField label='Verification code'
                        defaultValue = {this.props.match.params.key}
                        InputProps={inputDisabled}/>
                        <Button 
                            variant='outlined' 
                            color='primary'
                            onClick={this.verifyUser}>Verify</Button>
                        <Link to='/signin'>already have an account? Sign in</Link>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}

const mapActionsToProps = {
    signUser,
}

export default connect(null, mapActionsToProps)(withStyles(styles)(VerifyEmail));