import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category'
import {connect} from 'react-redux';


















class CategoryList extends Component {


    // dispalyList = ()=>{
    //     let {categories} = this.props;
    //     let resultAr = [];


    // displayList = ()=>{   

    //     let resultAr = [];
    //     let cats = [...this.props.data]
    //     // console.log(cats)




    //     let ar=[
    //         {id: 1, title: 'hello', parent: 0},
    //         {id: 2, title: 'hello', parent: 0},
    //         {id: 3, title: 'hello', parent: 1},
    //         {id: 4, title: 'hello', parent: 3},
    //         {id: 5, title: 'hello', parent: 4},
    //         {id: 6, title: 'hello', parent: 4},
    //         {id: 7, title: 'hello', parent: 3},
    //         {id: 8, title: 'hello', parent: 2}
    //     ]


    //     let res =  getNestedChildren(this.props.data, this.props.data[0]._id)
     
    // }


    getNestedChildren=(arr, parent)=> {
        var out = []
        
        for(let i in arr) {
            
            
            if(arr[i].parent == parent) {
               
                var children = this.getNestedChildren(arr, arr[i]._id)
    
                if(children.length) {
                    arr[i].children = children
                }
                out.push(arr[i])
            } else {
                out.push(arr[i])
            }
        }
        return out
    }
    





    render(){

        console.log(this.props.data)
   
        const {style, data} = this.props
        console.log( this.getNestedChildren(this.props.data, this.props.data[0]._id))
        return (

            <List className = {style.listWidth}>
                {   
                    data.map((item, key)=>{
                        if(!item.parent && !item.child) {
                            return <ListItem className = {style.subCats} key={key}>
                                     <Category 
                                        categoryName={item.name}
                                        parent={null}
                                        key={+item._id} 
                                        id={item._id}
                                        position={key}
                                        parentPosition={key}
                                        child={(item.children && 
                                                item.children.length > 0)? true: false}
                                        />  
                                        
                                    </ListItem>
                        } else {
                            return <CategoryList data={item.children} key={key}/>
                        }







                        // if (item.parent && item.children.length > 0) {
                        //     return <CategoryList categories={item.children} key={key}/>
                        // } else {
                        //   return <ListItem className = {style.subCats} key={key}>
                        //             <Category 
                        //                 categoryName={item.name}
                        //                 parent={null}
                        //                 key={+item._id} 
                        //                 id={item._id}
                        //                 position={key}
                        //                 parentPosition={key}
                        //                 child={(item.children && 
                        //                         item.children.length > 0)? true: false}
                        //                 />  
                        //             </ListItem>
                        // }
                    })
                }
                
            </List>
        )
    }
}
//  category list component

const mapStateToProps = state=>({
    data: state.userData
})

export default connect(mapStateToProps)(CategoryList);
