import React, {Fragment} from 'react';
import {TextField, ListItem, Divider} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";

const inputProps = {
    disableUnderline: true
}
// reusable category component
const Category = (props)=>{
    const {categoryName} = props
    return(
       <Fragment>
           <ListItem>
                <TextField value={categoryName} InputProps = {inputProps}/>
                <Button color="info">
                    <ArrowUpward/>
                </Button>
                <Button color="info">
                    <ArrowDownward/>
                </Button>
                <Button color="warning">
                    <Clear/>
                </Button>
                <Button color="info">
                    <Loupe/>
                </Button>
            </ListItem>
            <Divider/>
        </Fragment>
    )
}


export default Category;