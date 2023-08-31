const AbsoluteBubble = ({
  right = 25,
  icon,
  onClick,
}: {
  right?: number;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      style={{ right: `${right}px` }}
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center text-black absolute bottom-10 bg-purple-200 border border-purple-600 rounded-full  h-10 w-10 "
    >
      {icon}
    </div>
  );
};

export default AbsoluteBubble;
