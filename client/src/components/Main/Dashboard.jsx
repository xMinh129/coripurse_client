import React, {PropTypes} from 'react';
import Overview from './Overview.jsx';
import {Card} from 'material-ui/Card';
import ItemList from '../Items/ItemList.jsx'

const Dashboard = ({secretData, token}) => (
    <ItemList/>

);

// Dashboard.propTypes = {
//     secretData: PropTypes.string.isRequired,
//     token: PropTypes.string.isRequired
// };

export default Dashboard;


{/*<Card className="container">*/
}
{/*{secretData && <CardText className="notification-box" style={{fontSize: '16px', color: 'green'}}>{secretData}</CardText>}*/
}
{/*</Card>*/
}