import React, {Component} from "react";
import {connect} from 'react-redux';
import getUserData from '../../actions/getUserData.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, List, ListItem, Divider} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from 'components/CustomButtons/Button.jsx'
import Category from "components/Category/Category.jsx";


const styles = {
    configBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
}

// fake categories
let categories = [
    {   
        name: 'category1',
    },
    {
        name: 'category2',
    }
]



class Config extends Component {

    componentDidMount() {
        if(!this.props.userData) this.props.getUserData()
      }


    addCategory =()=>{
        let newCategory = {
            name: 'New Category'
        }
    }


    render(){
        const {classes} = this.props;
        return (
            <Card>
            <CardHeader color="primary">
                <h3>Edit Categories</h3>
                <h5>Please config your categories</h5>
            </CardHeader>
            <CardBody className={classes.configBody}>
                <List>
                    {categories.map(item=>{
                        console.log(item.name)
                        return <Category categoryName={item.name} key={item.name}/>
                    })}
                    {/* <Category/> */}
                </List>
                <Button color="primary"
                onClick = {this.addCategory}>ADD CATEGORY</Button>
            </CardBody>
        </Card>
        )
    }
}

const mapStateToProps = state=>({
    userData: state.userData
})

const mapActionsToProps = {
    getUserData
  }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Config));