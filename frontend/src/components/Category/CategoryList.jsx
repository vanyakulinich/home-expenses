import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category'
import {connect} from 'react-redux';


//  category list component

class CategoryList extends Component {

// recursion for data array   
organizeData =(arr, parent)=>{
    let out =[]
    for(let i in arr) {
        
        if(arr[i].parent == parent) {
           
            let children = this.organizeData(arr, arr[i]._id)

            if(children.length) {
                arr[i].children = children
            }
            out.push(arr[i])
        } else {
            out.push(arr[i])
        }
    }
    console.log(out)
    return out
}
        

    render(){
        const {style, key} = this.props
        let flag = !!key ? true : false 
        const data = flag ? 
                        this.props.data : 
                        this.organizeData(this.props.data, this.props.data[0]._id)
        return (
            <List className = {style.listWidth}>
            {
                data.map((item, key)=>{
                    if(item.parent && item.children.length>0) {
                      return <CategoryList data={[...item.children]} key={key} 
                                parent={item._id} 
                                child={item.isChild}
                                style={style}/>
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
