import React, { useState, useEffect } from 'react'
import { db } from '../firebase/firebaseConfig'
import {
    doc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { nanoid } from 'nanoid';


//8 campos de los cuales la fecha de creación se toma automaticamente
const formBill = {
    "id": null,
    "name_company": "",
    "nit": "",
    "type_company": "",
    "created_at": "",
    "state": "",
    "apply_taxes": "",
    "payment_method": "",
    "bill_value": "",
}

const Factura = () => {
    const [form, setForm] = useState(formBill);
    const [dbs, setDbs] = useState([]);
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        //Obtener datos
        const getData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "bills"));
                const array = querySnapshot.docs.map(item => (
                    {
                        ...item.data(), id: item.id,
                    }
                ))
                setDbs(array)

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    //Funcion para crear o editar 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name_company || !form.nit || !form.bill_value) {
            alert("Datos incompletos, Por favor validar la información ingresada");
            return;
        }
        if (edit) {
            try {
                const updateBill = doc(db, "bills", form.id);
                await updateDoc(updateBill, form);
                let newData = dbs.map((el) => (el.id === form.id ? form : el));
                setDbs(newData);
                setEdit(false)
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            try {
                let created = new Date().toISOString().split('T')[0];
                const docRef = await addDoc(collection(db, "bills"), { ...form, id: nanoid(), created_at: created });
                setDbs([...dbs, { ...form, created_at: created, id: docRef.id }]);
                alert("Se agregó una nueva factura");
                console.log(form);
            } catch (error) {
                console.log(error);
            }
        }

        handleReset();
    };

    //Eliminar dato
    const deleteData = async (id) => {
        try {
            console.log(id, "id a borrar")
            await deleteDoc(doc(db, "bills", id));
            let newData = dbs.filter((el) => (el.id === id ? null : el));
            setDbs(newData);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    //Preparar datos para editar
    const formUpdate = (data) => {
        console.log(data)
        setForm(data);
        setEdit(true);
    };

    //Obtener valores del formulario
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    //Resetear valores del formulario
    const handleReset = (e) => {
        setForm(formBill);
        setEdit(false)
    };

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col shadow-sm p-3 mb-5 bg-body rounded">
                    <div className="container">
                        <div className="row">
                            {/* Cards */}
                            {dbs.map(({ id, name_company, nit, state, created_at, type_company, payment_method, bill_value, apply_taxes }) => (
                                <div className="col-6 mb-1" key={id}>
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title"><img src='https://img.icons8.com/cotton/128/invoice.png' alt='icon' width="24" height="24" />  {name_company}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted"><strong>Nit:</strong> {nit}</h6>
                                            <p className="card-text"><strong>Tipo de empresa:</strong> {type_company}</p>
                                            <p className="card-text"><strong>Estado de factura:</strong> {state}</p>
                                            <p className="card-text"><strong>Medio de pago:</strong> {payment_method}</p>
                                            <p className="card-text"><strong>Fecha de la factura:</strong> {created_at}</p>
                                            <p className="card-text"><strong>Aplica impuestos:</strong> {apply_taxes}</p>
                                            <p className="card-text"><strong>Valor de factura:</strong> {bill_value}</p>
                                            <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                                <button onClick={() => formUpdate({ id, name_company, nit, state, created_at, type_company, payment_method, bill_value, apply_taxes })} type="button" className="btn btn-warning">Editar</button>
                                                <button onClick={() => deleteData(id)} type="button" className="btn btn-danger">Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col shadow-sm p-3 mb-5 bg-body rounded">
                    {/* Formulario */}
                    <h3>{edit ? "Editar Factura" : "Agregar Factura"}</h3>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre de la empresa:</label>
                            <input type="text" placeholder='Nombre de la empresa' onChange={handleChange} value={form.name_company} name="name_company" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">NIT:</label>
                            <input type="text" placeholder='NIT' onChange={handleChange} value={form.nit} name="nit" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo de empresa:</label>
                            <select required onChange={handleChange} value={form.type_company} name="type_company" className="form-select" >
                                <option value=""></option>
                                <option value="Privada">Privada</option>
                                <option value="Publica">Publica</option>
                                <option value="Mixta">Mixta</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Estado factura:</label>
                            <select required onChange={handleChange} value={form.state} name="state" className="form-select">
                                <option value=""></option>
                                <option value="Pendiente pago">Pendiente pago</option>
                                <option value="Pagado">Pagado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Medio de pago</label>
                            <select required onChange={handleChange} value={form.payment_method} name="payment_method" className="form-select">
                                <option value=""></option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Debito">Debito</option>
                                <option value="Credito">Credito</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Aplica impuestos</label>
                            <select required onChange={handleChange} value={form.apply_taxes} name="apply_taxes" className="form-select">
                                <option value=""></option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor de factura:</label>
                            <input type="text" placeholder='Valor de factura' onChange={handleChange} value={form.bill_value} name="bill_value" className="form-control" />
                        </div>
                        {edit ? <div><button className="btn btn-warning" type='submit' >Editar</button> <button onClick={handleReset} className="btn btn-dark"  >Cancelar</button></div> : <button className="btn btn-primary" type='submit' >Enviar</button>}
                    </form>
                </div>

            </div>
        </div >
    )
}

export default Factura