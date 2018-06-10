import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const TopUpForm= ({name,
  onSubmit,
  onChange,
  errors,
  successMessage,
  transaction
}) => (
  <Card className="authentication-container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Top Up To {name}</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Amount"
          name="amount"
          onChange={onChange}
          value={transaction.amount}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="TopUp" primary />
      </div>


    </form>
  </Card>
);


export default TopUpForm;
