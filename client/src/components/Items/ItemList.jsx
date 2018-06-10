import React from 'react';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import MediaCard from '../Items/MediaCard.jsx'
import _ from 'lodash'
import Item from './Item.jsx'

// import apiRequest from '../../api_methods.jsx';

class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.loadItems = this.loadItems.bind(this)
        this.renderItems = this.renderItems.bind(this)

    }

    loadItems() {
        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5010/api/getItems');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    data: xhr.response.items.d
                });
            }

        });
        xhr.send()
    }

    renderItems() {
        return this.state.data.map( product =>
            // console.log('map function'); ok
            // console.log(product.Name); ok
            <MediaCard
                style={{display: 'inline-block', marginRight: '15px'}}
                name={product.Name}
                description={product.Description}
                image={product.ImageURL}
                price={product.Price}
                productId={product.ID}
                updateCart={this.props.incrementCartSize}
            />
        )
    }

    componentDidMount() {
        this.loadItems()
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = (Object.keys(nextProps).length !== 0)
            && (!_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state))
        console.log('inside shouldComponentUpdate, showing')
        console.log(shouldUpdate)
        return shouldUpdate
    }

    render() {

        console.log('displaying all props of itemList.')
        console.log(this.props)

        if (this.state.data) {
            console.log('there is data')
            return (
                <div>
                    {this.renderItems()}
                </div>

            )
        } else {
            console.log('there isn\'t data')
            return (
                <LoadingBox/>
            )
        }

    }
}

export default ItemList;


