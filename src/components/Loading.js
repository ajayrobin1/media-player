const Loading = () => {
  return (
    <div className="z-80 fixed inset-0 flex bg-black/75  items-center justify-center bg-none text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 w-full h-full border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;