const Dialog = () => {
  return (
    <>
      <div
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          zIndex: "99999",
          backgroundColor: "gray",
          width: "100%",
          height: "100%",
          opacity: '0.5'
        }}
      >
      </div>
    </>
  );
};

export default Dialog;
