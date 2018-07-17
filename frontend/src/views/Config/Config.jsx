import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, List, ListItem, Divider} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from 'components/CustomButtons/Button.jsx'
import Category from "components/Category/Category.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";

const styles = {
    configBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
}

const Config = (props)=>{
    const {classes} = props;
    return(
        <Card>
            <CardHeader color="primary">
                <h3>Edit Categories</h3>
                <h5>Please config your categories</h5>
            </CardHeader>
            <CardBody className={classes.configBody}>
                <List>
                    <Category/>
                </List>
                <Button color="primary">ADD CATEGORY</Button>
            </CardBody>
        </Card>
    )
}

export default withStyles(styles)(Config);