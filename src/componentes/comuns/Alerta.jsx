import { useEffect, useState } from "react";

const Alerta = ({ alerta }) => {

    const [exibir, setExibir] = useState(false);

    useEffect(() => {
        setExibir(true);
        setTimeout(() => {
            setExibir(false);
        }, 3000);
    }, [alerta]);

    let classe = '';
    if (alerta.status === 'error') {
        classe = 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3';
    } else {
        classe = 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3';
    }

    return (
        <>
            {
                (alerta.message.length > 0 && exibir) &&
                <div className={classe} role="alert">
                    {alerta.message}
                </div>
            }
        </>
    )

}

export default Alerta;