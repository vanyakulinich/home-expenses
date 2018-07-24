import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category'
import {connect} from 'react-redux';



class CategoryList extends Component {
    render(){
        const {style, userData} = this.props
        return (

            <List>
                {
                    userData.map((item, key)=>{
                        if (item.children && item.children.length > 0) {
                            return <CategoryList userData={item.children} key={key}/>
                        } else {
                          return <ListItem className = {style} key={key}>
                                    <Category 
                                        categoryName={item.name}
                                        parent={null}
                                        key={+item._id} 
                                        id={item._id}
                                        position={key}
                                        parentPosition={key}
                                        child={(item.children && 
                                                item.children.length > 0)? true: false}
                                        color={'primary'}/>  
                                    </ListItem>
                        }
                    })
                }
            </List>




            //  <List>
            //     {userData.map((item, key)=>{ 
            //         if(item.children.length > 0) {
            //             let subItem = [...item.children]
                        
            //             return <ListItem className = {style} key={key}>
            //                         <Category 
            //                                 categoryName={item.name}
            //                                 key={+item._id} 
            //                                 id={item._id}
            //                                 position={key}
            //                                 parentPosition={null}
            //                                 child={false}/> 
            //                         <List>
            //                             {subItem.map((sub, i)=>{
            //                                 let name = sub.name
            //                                 return <ListItem key={i}>
            //                                             <Category 
            //                                                 categoryName={name}
            //                                                 parent={item.name}
            //                                                 key={+sub._id} 
            //                                                 id={sub._id}
            //                                                 position={i}
            //                                                 parentPosition={key}
            //                                                 child={true}
            //                                                 color={'primary'}/>  
            //                                         </ListItem>
            //                             })}
            //                         </List>
            //                     </ListItem>   
            //         } else {
            //             return <ListItem key={key}>
            //                         <Category 
            //                             categoryName={item.name} 
            //                             key={+item._id} 
            //                             id={item._id}
            //                             position={key}
            //                             parentPosition={null}
            //                             child={false}/>  
            //                     </ListItem>
            //         }     
            //     })}
            // </List>
        )
    }
}
//  category list component

const mapStateToProps = state=>({
    userData: state.userData
})

export default connect(mapStateToProps)(CategoryList);
