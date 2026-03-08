export default function FullPageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <img
        src="/full_logo.png"
        alt="شعار المنصة"
        className=" w-44 object-contain"
      />
      <div className="h-1.5 w-36 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/2 rounded-full bg-[#e29aff] loader-progress" />
      </div>
      <style>{`
        @keyframes loader-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .loader-progress {
          animation: loader-progress 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
