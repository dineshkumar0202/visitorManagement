import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  let isAuthenticated = false;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);

      if (decoded.exp * 1000 > Date.now()) {
        isAuthenticated = true;
      } else {
        // Token expired
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }

  return {
    isAuthenticated,
    role,
  };
};

export default useAuth;