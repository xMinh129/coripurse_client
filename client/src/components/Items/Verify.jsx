import React, {PropTypes} from 'react';
import Button from '@material-ui/core/Button';
import TopUpPage from '../../components/Items/TopUpPage.jsx';


class Verification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false,
            loadData: false,
            numberOfVerification: 0,
            name: ""
        };
        this.verifyAccount = this.verifyAccount.bind(this);
        this.retrieveAccount = this.retrieveAccount.bind(this);

    }

    retrieveAccount(name) {
        const payload = `name=${name}`;
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5010/api/signInWithImage');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    accountId: xhr.response.user.d.CustomerNumber
                })
                console.log('Accountid');
                console.log(this.state.accountId);
            }
        });
        xhr.send(payload);

    }

    verifyAccount() {

        if (this.state.numberOfVerification < 3) {
            const xhr = new XMLHttpRequest();
            xhr.open('post', 'http://localhost:5010/api/verifyAccount');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200 && xhr.response.success) {

                    alert('User found');
                    this.setState({
                        data: xhr.response.success,
                        name: xhr.response.name
                    });
                    if (this.state.data) {
                        this.setState({
                            numberOfVerification: this.state.numberOfVerification + 1
                        })
                    }
                    console.log(this.state.data);
                    // create an AJAX request
                    this.retrieveAccount(this.state.name);


                    // // change the current URL to /
                    // this.context.router.replace('/');
                } else if (xhr.status === 200 && !xhr.response.success){
                    alert('User unknown')
                }
                else {
                    // failure

                    // change the component state
                    const errors = xhr.response.errors ? xhr.response.errors : {};
                    errors.summary = xhr.response.message;

                }

            });

            xhr.send();

        }

    }


    componentDidMount() {
        this.setState({

        })
    }

    componentWillUnmount() {

    }

    render() {
        if (!this.state.data) {
            return (
                <div>
                    <Button size="small" color="primary" onClick={this.verifyAccount}>Top Up To Customer Wallet</Button>
                    <Button size="small" color="primary" onClick={this.verifyAccount}>Request Traction From Customer</Button>
                </div>
            )

        } else {
            return (
                <div>
                    <TopUpPage name={this.state.name} accountId={this.state.accountId}/>
                </div>
            )
        }
    }

}

export default Verification;