
import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const useApiRequest = (baseUrl = BASE_URL) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(
        async (endpoint, method = "GET", body = null, headers = {}) => {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            console.log('token is', token)
            try {
                const response = await axios({
                    url: `${baseUrl}${endpoint}`,
                    method,
                    data: body,
                    headers: {
                        "Content-Type": "application/json",
                        ...headers,
                        ...(token && { 'Authorization': `Bearer ${token}` }),
                    },
                    withCredentials: true,
                });

                setData(response.data);
                return response.data;
            } catch (err) {
                console.error("API Error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [baseUrl]
    );

    return { data, error, loading, request };
};
