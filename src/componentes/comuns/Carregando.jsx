function Carregando(props) {
    return (
        <>
            {
                !props.carregando ? props.children :
                    <div className="d-flex align-items-center m-5">
                        <strong>Carregando...</strong>
                        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"
                            role="status" aria-hidden="true"></div>
                    </div>
            }
        </>
    )
}

export default Carregando;