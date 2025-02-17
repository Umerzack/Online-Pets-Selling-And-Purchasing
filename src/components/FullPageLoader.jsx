import "./FullPageLoader.css";

function FullPageLoader() {
  return (
    <div className="full-page-loader">
      <div className="spinner-border spinner-lg" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default FullPageLoader;
