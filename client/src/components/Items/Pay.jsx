import React, {PropTypes} from 'react';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import Auth from "../../modules/Auth";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false,

        };
        this.makePayment = this.makePayment.bind(this);


    }

    makePayment() {

        const destAccountId = "4952020";
        const totalPrice = Auth.getTotalPrice();
        const currency = "USD";
        const pinCode = "0123";
        const payload = `destAccountId=${destAccountId}&amount=${totalPrice}&currencyIso=${currency}&pinCode=${pinCode}`;
        const userToken = Auth.getToken();

        //TODO use axios to make http request in the future

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5010/api/transferBalance');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        xhr.setRequestHeader('coriunder_cloud_Token', userToken);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                this.setState({
                    data: xhr.response
                });
                console.log(xhr.response);
                Auth.removeCart();


            } else {
                // failure

                // change the component state
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(payload);
    }

    componentDidMount(){
        this.makePayment();
    }

    render() {
        if (this.state.data) {
            return (
                <div>Payment is successful</div>
            )

        } else {
            return (
                <div>
                    <LoadingBox/>
                </div>

            )
        }
    }


}

export default Payment;