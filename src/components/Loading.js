import * as React from "react";

const LoadingBar = (props) => {
    return <div className={`${props.visible ? 'indeterminate' : 'hidden-indeterminate'}`} />;
}

export default LoadingBar