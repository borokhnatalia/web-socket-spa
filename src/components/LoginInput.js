import * as React from "react";

const LoginInput = (props) => {
    return (
        <div className="input-container">
            <label>{props.field}</label>
            <input
                className={props.error ? "input-error" : ""}
                type={props.type}
                placeholder={props.field}
                value={props.value}
                onKeyDown={props.handleKeyPress}
                onChange={props.handleChangeInput}
                name={props.field.toLowerCase()} />
        </div>
    );
}

export default LoginInput