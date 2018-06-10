import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router';
import { TableList, SumRow } from './Table.jsx'



class StartPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            payment: '',
            change: 0
        }
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        let change = (parseFloat(event.target.value) - 87.2).toFixed(2)
        this.setState({payment: event.target.value});
        this.setState({change: change});
        // console.log('displaying spare change')
        // console.log(change)
        // console.log(event.target.value)

    }

    render(){
        return (
            <div>
                <TableList/>

                <SumRow />

                <label style={{marginTop: '30px'}}>
                    Enter Payment Received
                    <input type="text" name="name" value={this.state.payment} onChange={this.handleChange}/>
                </label>

                <Button size="small" color="primary" onClick={this.verifyAccount}>
                    <Link to={{ pathname: '/verify', state: {change: this.state.change} }}>
                        Pay
                    </Link>
                </Button>

            </div>
        )
    }

}

export default StartPage;