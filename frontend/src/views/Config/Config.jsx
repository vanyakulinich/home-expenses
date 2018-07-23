import React, {Component} from "react";
import {connect} from 'react-redux';
import getUserData from '../../actions/getUserData.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import {List} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from 'components/CustomButtons/Button.jsx'
import configCategories from '../../actions/configCategories.jsx'
import CategoryList from '../../components/Category/CategoryList.jsx'

const styles = {
    configBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    subCats: {
        display: 'block',
    }
}

class Config extends Component {

    componentDidMount() {
        if(!this.props.userData) this.props.getUserData()
      }


    addCategory =()=>{
        this.props.configCategories('POST', {name:'New Category'})
    }

   
    render(){
        const {classes, userData} = this.props;
        return (
            <Card>
            <CardHeader color="primary">
                <h3>Edit Categories</h3>
                <h5>Please config your categories</h5>
            </CardHeader>
            <CardBody className={classes.configBody}>
               
                    {userData ? 
                        <CategoryList 
                            userData = {userData}   
                            style = {classes.subCats}/> : null}
                
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
    getUserData,
    configCategories
  }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Config));