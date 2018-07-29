import React, {Component} from 'react';
import {List, ListItem, Paper} from "@material-ui/core";
import Category from './Category'
import {connect} from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";

//  category list component
const styles = {
    catPaper: {
        width: '100%'
    },
    configList: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center', 
        width: '100%',
        flexDirection: 'column',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '0',
        position: 'relative'
        },
    iconStyle:{
        position: 'absolute',
        top: '89px',
        left: '21px',
    },
    relat: {
        position: 'relative'
    }
}

class CategoryList extends Component {
    render(){
        const {classes, data} = this.props
        return (<List className = {classes.configList}>
                {data.map((item, key)=>{
                    if(item.children) { 
                        return  <List key={+item._id+item._id} className = {classes.configList}>
                                    <ListItem className = {classes.configList} key={key+item._id+key}>
                                        <Paper className={classes.catPaper} key={key+item._id+key+item._id}>
                                            <Category 
                                            categoryName={item.name}
                                            parent={null}
                                            key={+item._id} 
                                            id={item._id}
                                            position={key}
                                            parentLength={data.length-1}
                                            child={item.isChild}
                                            children = {item.children}
                                            className={classes.relat}
                                            head={item.head}
                                            /> 
                                            <CategoryList 
                                                data={item.children} 
                                                classes={classes}
                                                key={key+item._id}/>
                                        </Paper>
                                    </ListItem>
                                </List> 
                    } else {
                        return  <ListItem className = {classes.configList} key={key+item._id}>
                                    <Category 
                                    categoryName={item.name}
                                    parent={null}
                                    key={+item._id} 
                                    id={item._id}
                                    position={key}
                                    parentLength={data.length-1}
                                    child={item.isChild}
                                    head={item.head}
                                    />  
                                    
                                </ListItem>
                    }})}    
                </List>
            )
        }
}

const mapStateToProps = state=>({
    data: state.data.userCategories
})

export default connect(mapStateToProps)(withStyles(styles)(CategoryList));
