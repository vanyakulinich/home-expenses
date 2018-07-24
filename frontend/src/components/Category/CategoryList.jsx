import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category'
import {connect} from 'react-redux';



class CategoryList extends Component {
    render(){
        const {style, userData} = this.props
        return (

            <List className = {style.listWidth}>
                {
                    userData.map((item, key)=>{
                        if (item.children && item.children.length > 0) {
                            return <CategoryList userData={item.children} key={key}/>
                        } else {
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
                        }
                    })
                }
            </List>
        )
    }
}
//  category list component

const mapStateToProps = state=>({
    userData: state.userData
})

export default connect(mapStateToProps)(CategoryList);
