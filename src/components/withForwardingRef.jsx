import React, { forwardRef } from "react";

const withForwardingRef = (Component) => {
    class HOC extends React.Component {
        render () {
            return <Component {...this.props} ref={this.props.forwardedRef} />
        }
    }

    return forwardRef( (props, ref ) => {
        return <HOC {...props} forwardedRef={ref} />
    })
}

export default withForwardingRef;