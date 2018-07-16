import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {TextField, Button} from "@material-ui/core";

const SignUp =()=>(
    <Fragment>
        <TextField label='Enter Your Email'/>
        <TextField label='Enter Your Password'/>
        <TextField label='Repeat Password'/>
        <Button variant='outlined' color='primary'>Sign Up</Button>
    </Fragment>
)

export default SignUp;