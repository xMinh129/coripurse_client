import React, {PropTypes} from 'react';
import Auth from '../../modules/Auth';
import TopUpForm from '../../components/Items/TopUpF.jsx';


class TopUpPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        // set the initial component state
        this.state = {
            errors: {},
            successMessage,
            transaction: {
                amount: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeTransaction = this.changeTransaction.bind(this);
    }

    processForm(event) {

        event.preventDefault();

        const amount = encodeURIComponent(this.state.transaction.amount);
        const userToken = Auth.getToken();

        const destAccountId = this.props.accountId;
        const currency = "USD";
        const pinCode = "0123";
        const formData = `destAccountId=${destAccountId}&amount=${amount}&currencyIso=${currency}&pinCode=${pinCode}`;

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

                alert("Successful payment");

                // change the current URL to /
                this.context.router.replace('/');
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
        xhr.send(formData);
    }

    changeTransaction(event) {
        const field = event.target.name;
        const transaction = this.state.transaction;
        transaction[field] = event.target.value;
        this.setState({
            transaction
        });
    }


    render() {
        return (
            <TopUpForm
                name={this.props.name}
                onSubmit={this.processForm}
                onChange={this.changeTransaction}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                transaction={this.state.transaction}
            />
        );
    }

}

TopUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default TopUpPage;