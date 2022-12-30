function Alert({ color = 'warning', message, onClose = null }) {
  if (message == null) {
    return null;
  }

  return (
    <div className={`alert alert-${color} alert-dismissable ${onClose != null ? 'alert-dismissable fade show' : ''}`} role="alert">
      {message}
      {
        onClose != null &&
        <button type="button" className="close" onClick={() => onClose()}>
          <span>&times;</span>
        </button>
      }
    </div>
  );
}

export default Alert;