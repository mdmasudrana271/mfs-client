const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <p className="text-7xl font-bold">L</p>
      <div className="w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-rose-600"></div>
      <p className="text-7xl font-bold">ading....</p>
    </div>
  );
};

export default Spinner;
