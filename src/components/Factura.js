import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { db } from '../firebase/firebaseConfig'
import {
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";



const formBill = {
    "id": null,
    "name_company": "",
    "nit": "",
    "type_company": "",
    "created_at": "",
    "state": "",
    "payment_method": "",
    "bill_value": "",
}

const Factura = () => {
    const [form, setForm] = useState(formBill);
    const [dbs, setDbs] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "bills"));
                const array = querySnapshot.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))
                setDbs(array)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let created = new Date().toISOString().split('T')[0]
            setForm({

                ...form
            })
            await addDoc(collection(db, "bills"), { ...form, id: nanoid(), created_at: created });
            setDbs([...dbs, form]);
            console.log(form)
        } catch (error) {
            console.log(error)
        }

    };


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    //  const handleReset = (e) => {
    //      setForm(formBill);
    //  };
    console.log(dbs, "informacion firebase")
    return (


        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col shadow-sm p-3 mb-5 bg-body rounded">
                    <div className="container">
                        <div className="row">
                            {dbs.map(({ id, name_company, nit, state, created_at, type_company, payment_method, bill_value }) => (
                                <div className="col-6 mb-1">
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title"><img src='https://img.icons8.com/cotton/128/invoice.png' alt='icon' width="24" height="24" />  {name_company}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted"><strong>Nit:</strong> {nit}</h6>
                                            <p className="card-text"><strong>Tipo de empresa:</strong> {type_company}</p>
                                            <p className="card-text"><strong>Estado de factura:</strong> {state}</p>
                                            <p className="card-text"><strong>Medio de pago:</strong> {payment_method}</p>
                                            <p className="card-text"><strong>Fecha de la factura:</strong> {created_at}</p>
                                            <p className="card-text"><strong>Valor de factura:</strong> {bill_value}</p>
                                            <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                                <button type="button" className="btn btn-warning">Editar</button>
                                                <button type="button" className="btn btn-danger">Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col shadow-sm p-3 mb-5 bg-body rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre de la empresa:</label>
                            <input placeholder='Nombre de la empresa' onChange={handleChange} defaultValue={form.name_company} name="name_company" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">NIT:</label>
                            <input placeholder='NIT' onChange={handleChange} defaultValue={form.nit} name="nit" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo de empresa:</label>
                            <select onChange={handleChange} defaultValue={form.type_company} name="type_company" className="form-select" >
                                <option value=""></option>
                                <option value="Privada">Privada</option>
                                <option value="Publica">Publica</option>
                                <option value="Mixta">Mixta</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Estado factura:</label>
                            <select onChange={handleChange} defaultValue={form.state} name="state" className="form-select">
                                <option value=""></option>
                                <option value="Pendiente pago">Pendiente pago</option>
                                <option value="Pagado">Pagado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Medio de pago</label>
                            <select onChange={handleChange} defaultValue={form.payment_method} name="payment_method" className="form-select">
                                <option value=""></option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Debito">Debito</option>
                                <option value="Credito">Credito</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor de factura:</label>
                            <input placeholder='Valor de factura' defaultValue={form.bill_value} name="bill_value" className="form-control" />
                        </div>
                        <button className="btn btn-primary" type='submit'>Enviar</button>
                    </form>
                </div>

            </div>
        </div >


    )
}

export default Factura