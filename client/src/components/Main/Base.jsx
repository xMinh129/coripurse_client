import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Auth from '../../modules/Auth';
import SimpleCard from '../Items/SimpleCard.jsx'
import MediaCard from '../Items/MediaCard.jsx'
import { withTheme } from '@material-ui/core/styles'
import ItemList from '../Items/ItemList.jsx'
import Cart from "../Items/Cart.jsx"

const styles = {
    navbar: {
        display: 'inline-block',
        color: 'yellow',
        marginLeft: '5px',
        marginRight: '5px'
    },
};

class Base extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cartSize: Auth.getCartSize(),
            balance: 0
        }
        this.incrementCartSize = this.incrementCartSize.bind(this)
        this.getBalance = this.getBalance.bind(this)
    }

    incrementCartSize(){
        this.setState({
            cartSize: this.state.cartSize + 1
        })
    }

    componentDidMount() {
        this.getBalance()
    }



    getBalance() {

        let payload = 'currencyIsoCode=USD';
        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5010/api/getBalance');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Company-Hash', '3Yv6kN8L');
        xhr.setRequestHeader('Coriunder-Cloud-Token', Auth.getToken());
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('xhr.response')
                console.log(xhr.response)
                this.setState({
                    balance: xhr.response.d[0].Current
                });

            }

        });
        xhr.send(payload)
    }

    render() {
        const { children } = this.props

        console.log('Displaying all stuffs within Base\' props')
        console.log(this.props)

        return (
            <div>
                <header id='header' style={{ marginBottom: '0px' }}>
                    <h1>
                        <a href='/'>
                            CoriPurse
                            <abbr></abbr>
                        </a>
                    </h1>

                    {Auth.isUserAuthenticated() ? (
                        <div style={{float: 'right', width: '400px'}}>
                            <p style={styles.navbar}>
                                <i className="fa fa-user user-icon" aria-hidden="true"></i>
                                Merchant: 5722306
                            </p>
                            <p style={styles.navbar}><Link to="/logout">Log out</Link></p>

                            <p style={styles.navbar}><Link to="/checkout">Check out</Link></p>

                        </div>

                    ) : (
                        <div id='notifications'>
                            <p className="nav navbar-left-link"><Link to="/login">Log in</Link></p>
                            <p className="nav"><Link to="/signup">Register</Link></p>
                        </div>
                    )}

                </header>

                {/*<div style={{marginTop: '50px'}}>*/}
                    {/*<Cart*/}
                        {/*cartSize={this.state.cartSize}*/}
                        {/*balance={this.state.balance}*/}
                    {/*/>*/}
                {/*</div>*/}

                <div style={{marginBottom: '80px'}}>
                    {children}
                </div>

                <footer className='footer'>
                    CoriPurse- Verification make simpler
                </footer>

            </div>
        )
    }
}


Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;
