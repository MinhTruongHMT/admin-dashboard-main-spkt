const Loader = () => {
  return (
    // <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
    //   <div className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-primary border-t-transparent"></div>
    // </div>
    // <span className={styles.loader} ></span>

    // <div className="relative h-100 w-100 bg-orange-300 ">
    //   <div className="absolute inset-0 bottom-0">

    //   </div>
    // </div>

    <div className="relative w-full ">
      <img
        className="absolute w-20 h-20 right-1/2 top-50 translate-x-1/2 translate-y-1/2"
        src="./Hourglass.gif"
        alt=""
      />
    </div>
  );
};

export default Loader;
