function CustomLoader({ text }) {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center align-middle">
        {text && <h2 className="text-center me-4 mt-3">{text}</h2> }
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default CustomLoader;