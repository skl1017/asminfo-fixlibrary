const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
export const API_BASE_URL = IP ? `http://${IP}:8000` : "http://localhost:8000";
