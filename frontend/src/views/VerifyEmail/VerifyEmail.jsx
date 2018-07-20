import React, {Fragment} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Button} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {Link} from "react-router-dom";
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

const verifyUser = ()=>{

    let [email, verifyKey] = document.querySelectorAll('[type="text"]');
        let verifyUser = {
            email: email.value,
            verifyKey: verifyKey.value
        }
       email.value = verifyKey.value= '';


    signUser(verifyUser, '/verify')
}

const VerifyEmail = (props)=>{
    const {classes} = props;
    return <Fragment>
        <Card className={classes.cardMain}>
            <CardHeader color="primary">
                <h3>Email verification to finish registration with Home Expense App</h3>
                <h5>Please confirm email address</h5>
            </CardHeader>
            <CardBody className={classes.cardBody}>
                <TextField label='Email address'/>
                <TextField label='Verification code'/>
                <Button 
                    variant='outlined' 
                    color='primary'
                    onClick={verifyUser}>Verify</Button>
                <Link to='/signin'>already have an account? Sign in</Link>
            </CardBody>
        </Card>
    </Fragment>
}

export default withStyles(styles)(VerifyEmail);