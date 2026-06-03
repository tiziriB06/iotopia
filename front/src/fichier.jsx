import React, { useEffect } from "react";
import { useApiRequest } from "./hooks/useApiRequest";

const Exemple = () => {
    const { data: quizData, error, loading, request } = useApiRequest('http://localhost:3000')
    //pour retrieve data
    useEffect(() => {
        request('/api/quizs', "GET")
    }, [request])
    //pour poster du data 
    useEffect(() => {
        request('/auth/register', "POST", user)
    }, [request])

    user = {
        name: 'tiziri',
        motdepasse: 'khaled'
    }
    //
    useEffect(() => {
        request('/api/quizs', "PUT")
    }, [request])

}