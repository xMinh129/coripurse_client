import React, {PropTypes} from 'react';

class Item extends React.Component {

    constructor(props) {
        super(props);
        // console.log('Item component is rendering')

    }

    componentDidMount(){

    }

    componentWillMount(){
        console.log('Item component is rendering')
    }


    render() {
        const { name, image, price, productId, description } = this.props;

        // console.log('item component is rendering...')

        return (
            <div>
                <p>
                    {name}
                </p>
                <img
                    key={name}
                    src={image}
                />
                <p>
                    {price}
                </p>
                <p>
                    {description}
                </p>
                <p>
                    {productId}
                </p>
            </div>
        )
    }
}

Item.propTypes = {
    name: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    productId: PropTypes.number.isRequired
};

export default Item;