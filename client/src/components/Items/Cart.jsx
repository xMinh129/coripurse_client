import React, {PropTypes} from 'react';

const Cart = (props) => {

    return (
        <div>
            <p style={{width: '100px', marginRight: '5px', float: 'right', display: 'block'}}>
                Your account Balance <bold>{props.balance}</bold>
            </p>

            <p style={{width: '100px', marginRight: '5px', float: 'right', display: 'block'}}>
                Items in the Cart <bold>{props.cartSize}</bold>
            </p>
        </div>

    )

}

export default Cart
