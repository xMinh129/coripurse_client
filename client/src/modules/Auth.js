class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token, userData) {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData));

    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;

    }

    static getUserData() {
        return JSON.parse(localStorage.getItem('userData'));
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('cartCookie');
        localStorage.removeItem('cartSize');
        localStorage.removeItem('totalPrice');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        return localStorage.getItem('token');
    }

    static getCartCookie() {
        if (localStorage.getItem('cartCookie')) {
            return localStorage.getItem('cartCookie')
        }

    }

    static setCartCookie(cartCookie) {
        localStorage.setItem('cartCookie', cartCookie);
    }

    static getCartSize() {
        if (localStorage.getItem('cartSize')) {
            return localStorage.getItem('cartSize')
        }

    }

    static setCartSize(cartSize) {
        localStorage.setItem('cartSize', cartSize);
    }

    static getTotalPrice() {
        if (localStorage.getItem('totalPrice')) {
            return localStorage.getItem('totalPrice')
        }
    }

    static setTotalPrice(totalPrice) {
        localStorage.setItem('totalPrice', totalPrice);
    }

    static removeCart(){
        localStorage.removeItem('cartCookie');
    }


}

export default Auth;
