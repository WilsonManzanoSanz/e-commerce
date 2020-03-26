import React from 'react';

class Products extends React.Component{
    
    componentDidMount(){
        console.log(this.props);
    }

    render(){
        return(<div>
            Hola
        </div>);
    }
}

export default Products;