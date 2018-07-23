import React from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category.jsx'


//  category list component
const CategoryList = ({...props})=>{
    const {style, userData} = props
    console.log(userData)
    return <List>
                {userData.map((item, key)=>{ 
                    if(item.children.length > 0) {
                        return <ListItem className = {style} key={key}>
                                    <Category 
                                                categoryName={item.name}
                                                key={+item._id} 
                                                id={item._id}/> 
                                    <List>
                                        {item.children.map((subitem, i)=>{
                                            return <ListItem key={i}>
                                                        <Category 
                                                            categoryName={subitem.name}
                                                            parent={item.name}
                                                            key={+subitem._id} 
                                                            id={subitem._id}/>  
                                                    </ListItem>
                                        })}
                                    </List>
                                </ListItem>   
                    } else {
                        return <ListItem key={key}>
                                    <Category 
                                        categoryName={item.name} 
                                        key={+item._id} 
                                        id={item._id}/>  
                                </ListItem>
                    }     
                })}
            </List>
}

export default CategoryList;
