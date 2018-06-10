import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Auth from '../../modules/Auth';

const styles = {
    card: {
        maxWidth: 345,
        marginBottom: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};


function MediaCard(props) {
    const {classes, name, image, price, description, productId} = props;

    console.log('Media Card is rendering')

    function addToCart(){
        const quantity = 1;
        var payload = "";
        if (Auth.getCartCookie()){
            console.log(Auth.getCartCookie());
            const cartCookie = Auth.getCartCookie();
            payload = `productId=${props.productId}&price=${props.price}&quantity=${quantity}&cartCookie=${cartCookie}`;
        }
        else{
            payload = `productId=${props.productId}&price=${props.price}&quantity=${quantity}`;
        }


         // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5010/api/addToCart');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Company-Hash', '3Yv6kN8L');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                console.log(xhr.response.size);

                // save the token and user data
                if (!Auth.getCartCookie()){
                    Auth.setCartCookie(xhr.response.cookie.d);

                }

                Auth.setCartSize(xhr.response.size);
                Auth.setTotalPrice(xhr.response.total);
                console.log('Added to cart');
                console.log(Auth.getCartSize());
                console.log(Auth.getTotalPrice());


                // // change the current URL to /
                // this.context.router.replace('/');
            } else {
                // failure

                // change the component state
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

            }
        });

        xhr.send(payload);
        alert(`Item \'${props.name}\' has been added to your cart.`)

    }

    return(
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUORRVqXN8n9LLRTwXPW25gA34-Ho2DlWhaZ4J6SnKFq7yRjD0'}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {name}
                    </Typography>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                    <Button size="small" color="primary" onClick={addToCart}>
                        Add To Cart
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default withStyles(styles)(MediaCard);
