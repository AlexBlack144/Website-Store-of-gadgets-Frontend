import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import '../cssFiles/style_credit.css';

const PaymentForm = ({state,setState}) => {

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    return (
        <div>
        <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
        />
        <br></br>
        <form>
            <input
                maxlength="16"
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />
            &nbsp;
            <small>49..., 51..., 36..., 37...</small>
            <input
                maxlength="18"
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />
            <input
            maxlength="4"
            type="tel"
            name="expiry"
            className="form-control"
            placeholder="Valid Thru"
            pattern="\d\d/\d\d"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />
            <input
            maxlength="3"
            type="tel"
            name="cvc"
            className="form-control"
            placeholder="CVC"
            pattern="\d{3,4}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />        
        </form>
        </div>
    );
}

export default PaymentForm;