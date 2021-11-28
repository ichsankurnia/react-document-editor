import { ErrorMessage } from "@hookform/error-message";

const ErrorField = ({errors, name}) => {
    return <ErrorMessage
            errors={errors}
            name={name}
            render={({ messages }) => {
                // console.log("messages", messages);
                return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p key={type} className='text-red-500 text-xs mt-1 font-medium'>⚠ {message}</p>
                    ))
                    : null;
            }}
        />
}

export default ErrorField