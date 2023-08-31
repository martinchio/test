import Spinner from "./Spinner";

interface ButtonProps {
  onClick: () => void;
  loading: boolean;
  children: React.ReactNode | string;
}

const Button: React.FC<ButtonProps> = ({ onClick, loading, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
