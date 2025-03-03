
interface ErrorProp{
    message : string;
}

function Error_Message({ message } : ErrorProp) {
    return ( 
      <p className="error">
        <span>⛔️</span> {message}
      </p>
    );
  }

  export default Error_Message;