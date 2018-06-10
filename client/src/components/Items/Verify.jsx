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
            name: "",
            change: this.props.location.state.change
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
    }

    componentWillUnmount() {

    }

    render() {
        console.log('displaying this.props.location.state.random')
        console.log(this.state.change)

        if (!this.state.data) {
            return (
                <div>
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <p style={{fontSize: '40px'}}>
                            You have a spare change of
                        </p>
                        <p style={{fontSize: '80px'}}>
                            ${this.state.change}
                        </p>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <Button size="medium" style={{ fontSize: '40px'}} color="primary" onClick={this.verifyAccount}>
                            Save to my coriunder wallet
                        </Button>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <Button size="medium" style={{ fontSize: '35px'}} color="primary" onClick={this.verifyAccount}>
                            Get back the cash
                        </Button>
                    </div>

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