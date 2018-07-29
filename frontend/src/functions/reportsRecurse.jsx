export default function recurse(arr, parent) {
    var out = []
    for(var i in arr) {
        if(arr[i].parentId === parent) {
            var children = recurse(arr, arr[i].catId)
            if(children.length) {
                arr[i].children = children
                let value = 0;
                children.forEach(el=>value+=el.value)
                arr[i].value+=value
            }
            out.push(arr[i])
        } 
    }
    
    
    return out
}