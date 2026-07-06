import { useState, useEffect } from 'react';

export { BodyUsuarios };

function BodyUsuarios(data) {
    // Estados para el listado de la tabla
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estados para el formulario 
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [rolSeleccionado, setRolSeleccionado] = useState('6');

    const [guardando, setGuardando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    // Estado para controlar si estamos creando o editando
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    // URL base de tu API Gateway o controlador local
    const API_URL = "http://localhost:8086/uteq-backend/api/usuarios";

    useEffect(() => {
        listarUsuarios();
    }, []);

    // 1. GET - Listar usuarios
    const listarUsuarios = async () => {
        try {
            setCargando(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const datos = await response.json();
            setUsuarios(datos);
            setError(null);
        } catch (err) {
            setError("No se pudo conectar con el servidor de usuarios.");
        } finally {
            setCargando(false);
        }
    };

    // 2. NUEVO: DELETE - Eliminación lógica mapeada a tu controlador Java
    const eliminarUsuario = async (id) => {
        const confirmar = window.confirm(`¿Estás seguro de que deseas deshabilitar al usuario con ID: ${id}?`);
        if (!confirmar) return;

        try {
            // Le pegamos exactamente a la ruta @DeleteMapping("/{id}")
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Error del servidor al intentar deshabilitar el usuario.`);
            }

            alert("¡Usuario deshabilitado correctamente!");
            listarUsuarios(); // Refrescamos la tabla para ver los cambios en tiempo real
        } catch (err) {
            alert("Error al eliminar: " + err.message);
        }
    };

    // Función para abrir el modal precargado para edición
    const abrirModalEditar = (usr) => {
        setUsuarioEditando(usr);
        setNombre(usr.nombre);
        setCorreo(usr.email);
        setClave('');
        setRolSeleccionado(usr.rol?.id ? usr.rol.id.toString() : '6');
        setMostrarModal(true);
    };

    // Limpia los estados del formulario y cierra el modal
    const cerrarModal = () => {
        setNombre('');
        setCorreo('');
        setClave('');
        setRolSeleccionado('6');
        setUsuarioEditando(null);
        setMostrarModal(false);
    };

    // 3. POST / PUT - Guardar cambios (Creación o Edición)
    const guardarUsuario = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !correo.trim()) {
            return alert("Por favor, llena los campos obligatorios.");
        }

        if (!clave.trim()) {
            if (usuarioEditando) {
                return alert("Por restricciones del servidor, debes ingresar una contraseña para confirmar los cambios.");
            } else {
                return alert("La contraseña es obligatoria para nuevos usuarios.");
            }
        }

        try {
            setGuardando(true);

            const payload = {
                nombre: nombre,
                email: correo,
                clave: clave,
                rol: {
                    id: parseInt(rolSeleccionado)
                }
            };

            const esEdicion = usuarioEditando !== null;
            const metodo = esEdicion ? 'PUT' : 'POST';
            const urlFinal = API_URL;

            if (esEdicion) {
                payload.id = usuarioEditando.id;
            }

            const response = await fetch(urlFinal, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`El servidor respondió con código ${response.status}`);
            }

            alert(esEdicion ? "¡Usuario actualizado con éxito!" : "¡Usuario registrado con éxito!");
            cerrarModal();
            listarUsuarios();
        } catch (err) {
            alert("Error al procesar la solicitud: " + err.message);
        } finally {
            setGuardando(false);
        }
    };

    const renderTabla = () => {
        if (cargando) return <div className="text-center my-4"><div className="spinner-border text-success"></div><p className="mt-2 text-muted">Cargando...</p></div>;
        if (error) return <div className="alert alert-danger text-center">{error}</div>;
        if (usuarios.length === 0) return <div className="alert alert-info text-center">No hay usuarios activos registrados.</div>;

        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usr) => (
                            <tr key={usr.id}>
                                <td>{usr.id}</td>
                                <td>{usr.nombre}</td>
                                <td>{usr.email}</td>
                                <td>
                                    <span className={`badge ${usr.rol?.nombre === 'ADMINISTRADOR' ? 'bg-danger' : usr.rol?.nombre === 'ANALISTA' ? 'bg-info text-dark' : 'bg-secondary'}`}>
                                        {usr.rol?.nombre || 'TECNICO'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => abrirModalEditar(usr)}>
                                        <i className="bi bi-pencil-square"></i> Editar
                                    </button>
                                    {/* MODIFICADO: El botón rojo ahora ejecuta la función de eliminación lógica */}
                                    <button className="btn btn-sm btn-danger" onClick={() => eliminarUsuario(usr.id)}>
                                        <i className="bi bi-trash-fill"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="title-cont-page m-0">Gestión de Usuarios</h2>
                    <button className="btn btn-success" onClick={() => setMostrarModal(true)}>
                        <i className="bi bi-person-plus-fill me-2"></i> Nuevo Usuario
                    </button>
                </div>

                {renderTabla()}

                {/* ================= MODAL UNIFICADO ================= */}
                {mostrarModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className={`modal-header ${usuarioEditando ? 'bg-warning text-dark' : 'bg-success text-white'}`}>
                                    <h5 className="modal-title">
                                        <i className={`bi ${usuarioEditando ? 'bi-pencil-square' : 'bi-person-plus'}`}></i>
                                        {usuarioEditando ? ` Modificar Usuario (ID: ${usuarioEditando.id})` : ' Registrar Nuevo Usuario'}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={cerrarModal}></button>
                                </div>
                                <form onSubmit={guardarUsuario}>
                                    <div className="modal-body">

                                        <div className="mb-3">
                                            <label className="form-label font-weight-bold">Nombre Completo <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label font-weight-bold">Correo Electrónico <span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label font-weight-bold">Contraseña <span className="text-danger">*</span></label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={clave}
                                                onChange={(e) => setClave(e.target.value)}
                                                placeholder="Escribe la contraseña para procesar"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label font-weight-bold">Rol Asignado <span className="text-danger">*</span></label>
                                            <select
                                                className="form-select"
                                                value={rolSeleccionado}
                                                onChange={(e) => setRolSeleccionado(e.target.value)}
                                            >
                                                <option value="6">TECNICO - Funciones operativas</option>
                                                <option value="5">ANALISTA - Gestión de reportes</option>
                                                <option value="4">ADMINISTRADOR - Acceso total</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                                        <button type="submit" className={`btn ${usuarioEditando ? 'btn-warning' : 'btn-success'}`} disabled={guardando}>
                                            {guardando ? (
                                                <><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</>
                                            ) : usuarioEditando ? 'Actualizar Cambios' : 'Guardar Usuario'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {/* =========================================================================== */}

            </div>
        </div>
    );
}