import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import configCategories from '../../actions/configCategories.jsx'
import {List, ListItem} from "@material-ui/core";
import Category from './Category.jsx'

const styles = {
    subCats: {
        display: 'block',
    }
}

//  category list component
const CategoryList = ({...props})=>{
    const {style, userData} = props
    return <List>
                {userData.map((item)=>{ 
                    if(item.children.length > 0) {
                    
                        return <ListItem className = {style}>
                                    <Category 
                                                categoryName={item.name} 
                                                key={item._id} 
                                                id={item._id}/> 
                                    <List>
                                        {item.children.map((subitem)=>{
                                            return <ListItem>
                                                        <Category 
                                                            categoryName={subitem.name} 
                                                            key={subitem._id} 
                                                            id={subitem._id}/>  
                                                    </ListItem>
                                        })}
                                    </List>
                                </ListItem>   
                    } else {
                        return <ListItem>
                                    <Category 
                                        categoryName={item.name} 
                                        key={item._id} 
                                        id={item._id}/>  
                                </ListItem>
                    }     
                })}
            </List>
}

export default withStyles(styles)(CategoryList);
