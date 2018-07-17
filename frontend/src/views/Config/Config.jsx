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
    cardMain: {
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    }
}



const Config = (props)=>{
    const {classes} = props;
    return(
        <Card className={classes.cardMain}>
            <CardHeader color="primary">
                <h3>Edit Categories</h3>
                <h5>Please config tyour categories</h5>
            </CardHeader>
            <CardBody className={classes.cardBody}>
                <List>
                    <ListItem>
                        <TextField value='Category'/>
                        <Button color="info">
                            <ArrowUpward/>
                        </Button>
                        <Button color="info">
                            <ArrowDownward/>
                        </Button>
                        <Button color="warning">
                            <Clear/>
                        </Button>
                        <Button color="primary">
                            <Loupe/>
                        </Button>
                    </ListItem>
                    <Divider/>
                </List>
            </CardBody>
        </Card>
    )
}

export default withStyles(styles)(Config);