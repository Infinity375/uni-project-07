import { useState } from "react";

export function useForm(initioalValues, submitCallback) {
    const [values, setValues] = useState(initioalValues);

    const changeHandler = (e) =>{
        setValues(state =>({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const submitHandler = (e) =>{
        e.preventDefault();
        submitCallback(values);
    };
 
    return{
        values,
        changeHandler,
        submitHandler
    };

}