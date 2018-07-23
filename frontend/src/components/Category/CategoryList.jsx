import React from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category'


//  category list component
const CategoryList = ({...props})=>{
    const {style, userData} = props
    console.log(userData)
    return <List>
                {userData.map((item, key)=>{ 
                    if(item.children.length > 0) {
                        return <ListItem className = {style} key={key+item._id}>
                                    <Category 
                                                categoryName={item.name}
                                                key={+item._id} 
                                                id={item._id}
                                                position={key}/> 
                                    <List>
                                        {item.children.map((subitem, i)=>{
                                            return <ListItem key={i}>
                                                        <Category 
                                                            categoryName={subitem.name}
                                                            parent={item.name}
                                                            key={+subitem._id} 
                                                            id={subitem._id}
                                                            position={i}/>  
                                                    </ListItem>
                                        })}
                                    </List>
                                </ListItem>   
                    } else {
                        return <ListItem key={key}>
                                    <Category 
                                        categoryName={item.name} 
                                        key={key+item._id} 
                                        id={item._id}
                                        position={key}/>  
                                </ListItem>
                    }     
                })}
            </List>
}

export default CategoryList;
