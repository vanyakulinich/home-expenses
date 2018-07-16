import React, {Fragment} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Button} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
    cardMain: {
        width: '400px'
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        height: '300px'

    }
}


const SignIn = (props)=>(
    <Fragment>
        <Card className={props.classes.cardMain}>
            <CardHeader color="primary">
                <h3>Sign into Home Expense App</h3>
                <h5>Please enter your email and password</h5>
            </CardHeader>
            <CardBody className={props.classes.cardBody}>
                <TextField label='Enter Email'/>
                <TextField label='Enter password'/>
                <Button variant='outlined' color='primary'>Sign In</Button>
            </CardBody>
        </Card>
    </Fragment>
)

export default withStyles(styles)(SignIn);