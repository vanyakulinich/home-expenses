const configParams=(id, name, parent, dir)=>({
    name: name,
    id,
    parent: parent || null,
    direction: dir || null,
    // position: this.props.position
})

export default configParams