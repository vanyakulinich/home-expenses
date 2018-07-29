
export default function recurse(arr, parent) {
    var out = []

        for(var i in arr) {
            
                if(arr[i].parent === parent) {
                    var children = recurse(arr, arr[i]._id)
        
                    if(children.length) {
                        arr[i].children = children
                    }
                    out.push(arr[i])
                }
        }
    return out
}