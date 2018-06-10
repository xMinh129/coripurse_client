import React, {PropTypes} from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap'

import {Link} from 'react-router';

class FindProductButton extends React.Component {

    render() {
        return (
            <div>
                <ButtonToolbar>
                    <Link to="/items" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Button bsStyle="info">
                            Find Product to Shop
                        </Button>
                    </Link>
                </ButtonToolbar>
            </div>
        )
    }
}

export default FindProductButton
