import ReactDOM from 'react-dom';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className='fixed top-10 left-1/2 -translate-x-1/2 bg-red-600 opacity-90 text-slate-50 rounded-md z-50 px-3 py-6'>
            {message}
        </div>
    );
};

export default ErrorMessage;

interface ModalProps {
    message: string;
}

export const Modal: React.FC<ModalProps> = ({ message }) => {
    const container = document.getElementById('errorMessage');
    return (
        <>
            {container &&
                ReactDOM.createPortal(
                    <ErrorMessage message={message} />,
                    container
                )}
        </>
    );
};
