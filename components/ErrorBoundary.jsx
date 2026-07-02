import React from "react";

class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props)

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false, error: { message: "", stack: "" }, errorInfo: { componentStack: "" } }
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
        this.setState({ error, errorInfo });
    }

    triggerError = ({ error, errorInfo }) => {
        console.log({ error, errorInfo });
        this.setState({ hasError: true });
        this.setState({ error, errorInfo });
    }

    resetError = () => this.setState({ hasError: false });

    render() {
        
        if (this.state.hasError) {
            return (<>
                <div className="row g-0 d-flex d-flex justify-content-center align-items-center">
                    <img className="ratio ratio-21x9" alt="Imagen de error" src="/assets/img/img-error-general-es.webp" style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed" }} />
                </div>
            </>)
        }

        return this.props.children
    }
}

export default ErrorBoundary;
