import Spinner from "./Spinner";

interface ButtonProps {
  onClick?: () => void;
  loading: boolean;
  children: React.ReactNode | string;
  type?: "submit" | "button";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  loading,
  children,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      type={type}
      className={`text-md font-semibold cursor-pointer px-4 py-2 bg-purple-200 rounded hover:bg-purple-30 ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
