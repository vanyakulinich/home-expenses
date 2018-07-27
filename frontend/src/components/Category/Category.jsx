import React, {Fragment, Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {TextField, ListItem, Divider, Dialog, Paper} from "@material-ui/core";
import Button from 'components/CustomButtons/Button.jsx'
import {Clear, ArrowUpward, ArrowDownward, Loupe} from "@material-ui/icons";
import configCategories from '../../actions/configCategories';

import FormDialog from 'components/FormDialog/FormDialog.jsx';
import AlertDialog from 'components/AlertDialog/AlertDialog.jsx';
import SimpleDialogDemo from 'components/SimpleDialog/SimpleDialog.jsx'


import configParams from '../../functions/configFetch.jsx'


const styles = {
    configContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', 
        width: '100%'
    }
}

// reusable category component
class Category extends Component{

    deleteCategory = (name)=>{
        this.props.configCategories('DELETE', 'category', configParams(this.props.id))
    }
        

    moveCategoryUp = (e)=>{
        console.log(this.props)
      if(this.props.position == 0) return null
        let config = configParams(this.props.id, null, null, true)
        this.props.configCategories('PUT', 'move', config)
    }

    moveCategoryDown = ()=>{
        console.log(this.props)
        if (this.props.position == this.props.parentLength) return null
        let config = configParams(this.props.id, null, null, false)
        this.props.configCategories('PUT', 'move', config)
    }

    renameCategory = (name)=>{
        this.props.configCategories('PUT', 'category', configParams(this.props.id, name))
    }
    render(){
        const {categoryName, children, child, userData, classes} = this.props;
        const buttonColor = (!children && child) ?  'primary'  : 'info'
        return(
            <Paper className={classes.configContainer}>
            
                <FormDialog 
                    name = {categoryName}
                    save = {this.renameCategory}
                />
                <div>
                 <Button color={buttonColor} onClick={this.moveCategoryUp}>
                     <ArrowUpward/>
                 </Button>
                 <Button color={buttonColor} onClick={this.moveCategoryDown}>
                     <ArrowDownward/>
                 </Button>
                 <AlertDialog 
                    delete = {this.deleteCategory}
                    name = {categoryName}
                    isChild={child} 
                 />
                <SimpleDialogDemo 
                    list = {userData.filter(item=>(item.name!==categoryName) && 
                                                    (item.parent == null) &&
                                                    (!item.children))}
                    parentitem = {userData.find(item=>item.name==categoryName)}
                    color={buttonColor}
                    id={this.props.id}
                />
                </div>
         
         </Paper>
        )
    }
}
const mapStateToProps = state=>({
    userData: state.data.userCategories
})

const mapActionsToProps = ({
    configCategories
})


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Category));