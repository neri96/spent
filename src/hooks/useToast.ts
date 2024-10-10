import { toast } from "react-toastify";

const useToast = () => {
  const handleSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleError = (message?: string) => {
    toast.error(message || "Something went wrong", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return { handleSuccess, handleError };
};

export default useToast;
