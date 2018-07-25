import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";
import Category from './Category'
import {connect} from 'react-redux';


//  category list component

class CategoryList extends Component {


    render(){
        const {style, data} = this.props
    
        return (
            
            <List className = {style.listWidth}>
                {   
                    data.map((item, key)=>{
                        
                        if(item.children) {
                             
                            return  <ListItem>
                                        <List>
                                            <ListItem>
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
                                            <ListItem>
                                                <CategoryList data={item.children} style={style} key={key+item._id}/>
                                            </ListItem>
                                        </List>
                                    </ListItem>   
                        } else {
                            return  <ListItem className = {style.subCats} key={key+item._id}>
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
        )
    }
}


const mapStateToProps = state=>({
    data: state.userData
})

export default connect(mapStateToProps)(CategoryList);
