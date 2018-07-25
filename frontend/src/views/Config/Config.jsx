import React, {Component} from "react";
import {connect} from 'react-redux';
import getUserData from '../../actions/getUserData'
import withStyles from "@material-ui/core/styles/withStyles";
import {List} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from 'components/CustomButtons/Button.jsx'
import configCategories from '../../actions/configCategories'
import CategoryList from '../../components/Category/CategoryList'

const styles = {
    configBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    subCats: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    listWidth: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
}

class Config extends Component {

    componentDidMount() {
        if(!this.props.userData) this.props.getUserData()
      }

    addCategory =()=>{
        this.props.configCategories('POST', 'category')
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
               
                    {userData ? <CategoryList style = {classes}/> : null}
                
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