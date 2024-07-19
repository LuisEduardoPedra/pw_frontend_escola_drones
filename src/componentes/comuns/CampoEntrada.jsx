import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';

function CampoEntrada({ id, label, tipo, placeholder, requerido, name, value, onchange, msgvalido, msginvalido, readonly }) {
    const [touched, setTouched] = useState(false);

    let inputClasses = "text-sm rounded-lg block w-full p-2.5 pr-10 ";

    const status = requerido && !value ? "error" : value ? "success" : "";

    if (touched) {
        if (status === "success") {
            inputClasses += "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700 dark:border-green-500";
            placeholder = msgvalido;
        } else if (status === "error") {
            inputClasses += "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700 dark:border-red-500";
            placeholder = msginvalido;
        } else {
            inputClasses += "border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400";
        }
    } else {
        inputClasses += "border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400";
    }

    return (
        <div className="mb-5 relative">
            <label htmlFor={id} className={`block mb-2 text-sm font-medium ${touched && status === "success" ? "text-green-700 dark:text-green-500" : touched && status === "error" ? "text-red-700 dark:text-red-500" : "text-gray-700 dark:text-gray-300"}`}>
                {label}
            </label>
            <div className="relative">
                {tipo === 'textarea' ? (
                    <textarea
                        className={inputClasses}
                        readOnly={readonly}
                        id={id}
                        placeholder={placeholder}
                        required={requerido}
                        name={name}
                        value={value}
                        onChange={(e) => {
                            setTouched(true);
                            onchange(e);
                        }}
                        onBlur={() => setTouched(true)}
                    />
                ) : (
                    <input
                        type={tipo}
                        className={inputClasses}
                        readOnly={readonly}
                        id={id}
                        placeholder={placeholder}
                        required={requerido}
                        name={name}
                        value={value}
                        onChange={(e) => {
                            setTouched(true);
                            onchange(e);
                        }}
                        onBlur={() => setTouched(true)}
                    />
                )}
                {tipo === 'number' && name.includes('frequencia') && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FontAwesomeIcon icon={faPercent} className="text-gray-500" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CampoEntrada;
