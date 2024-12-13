import "../index.css";

const Loader = () => {
  return (
    <div className="lds-ellipsis" role="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
