import Link from "next/link";

const GoBackHeader = () => {
  return (
    <div className="border-b mb-4 ">
      <div className="mb-4">
        <Link
          className="text-md font-semibold cursor-pointer px-2 py-1 bg-purple-200 rounded hover:bg-purple-300"
          href={"/"}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default GoBackHeader;
