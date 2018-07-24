import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category'
import {connect} from 'react-redux';


//  category list component

class CategoryList extends Component {

// example   
        // for(let i in arr) {
            
            
        //     if(arr[i].parent == parent) {
               
        //         var children = this.recusionList(arr, arr[i]._id)
    
        //         if(children.length) {
        //             arr[i].children = children
        //         }
        //         out.push(arr[i])
        //     } else {
        //         out.push(arr[i])
        //     }
        // }

    render(){
        const {style, data} = this.props
        // const list = this.recusionList(data, data[0]._id, style)

        // const recusionList = (arr, parent, style)=>{

        //     return <List className = {style.listWidth}>
        //             {
        //                 arr.map((item, key)=>{
        //                     if(item._id == parent) {
        //                         return this.recusionList(item, item._id, style)
    
        //                     } else {
        //                         return <ListItem className = {style.subCats} key={key}>
        //                                     <Category 
        //                                     categoryName={item.name}
        //                                     parent={null}
        //                                     key={+item._id} 
        //                                     id={item._id}
        //                                     position={key}
        //                                     parentPosition={key}
        //                                     // child={item.isChild}
        //                                     />  
                                            
        //                                 </ListItem>
        //                     }
    
        //                 })
        //             }
    
        //     </List>
    
        // }

        // const listOfCategories = this.displayListOne(data, data[0]._id)
        // console.log(listOfCategories)
        // const child = this.props.child || data[0].isChild
        const parent = this.props.parent || data[0]._id
        return (
            <List className = {style.listWidth}>
            {
                data.map((item, key)=>{
                    if(item._id == parent) {
                        <CategoryList data={item} key={key} 
                            parent={item._id} 
                            child={item.isChild}/>
                    } else {
                        return <ListItem className = {style.subCats} key={key}>
                                    <Category 
                                    categoryName={item.name}
                                    parent={null}
                                    key={+item._id} 
                                    id={item._id}
                                    position={key}
                                    parentPosition={key}
                                    child={item.isChild}
                                    />  
                                    
                                </ListItem>
                    }

                })
            }

    </List>
            // <List className = {style.listWidth}>
            //     {   
            //         listOfCategories.map((item, key)=>{
            //             if(item.length<=0) {
            //                 return <ListItem className = {style.subCats} key={key}>
            //                          <Category 
            //                             categoryName={item.name}
            //                             parent={null}
            //                             key={+item._id} 
            //                             id={item._id}
            //                             position={key}
            //                             parentPosition={key}
            //                             child={item.isChild}
            //                             />  
                                        
            //                         </ListItem>
            //             } else {
            //                 return <CategoryList data={item} key={key}/>
            //             }







            //             // if (item.parent && item.children.length > 0) {
            //             //     return <CategoryList categories={item.children} key={key}/>
            //             // } else {
            //             //   return <ListItem className = {style.subCats} key={key}>
            //             //             <Category 
            //             //                 categoryName={item.name}
            //             //                 parent={null}
            //             //                 key={+item._id} 
            //             //                 id={item._id}
            //             //                 position={key}
            //             //                 parentPosition={key}
            //             //                 child={(item.children && 
            //             //                         item.children.length > 0)? true: false}
            //             //                 />  
            //             //             </ListItem>
            //             // }
            //         })
            //     }
                
            // </List>
        )
    }
}


const mapStateToProps = state=>({
    data: state.userData
})

export default connect(mapStateToProps)(CategoryList);
