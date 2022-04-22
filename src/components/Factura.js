import React, { useState, useEffect } from 'react'




const formBill = {
    "id": null,
    "name_company": "empresa1",
    "nit": "123243121",
    "type_company": "",
    "created_at": 0,
    "state": "",
    "payment_method": "",
    "bill_value": "4543543",
}

const Factura = () => {
    const [form, setForm] = useState(formBill)



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
    };


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // const handleReset = (e) => {
    //     setForm(initialForm);
    //     setDataToEdit(null);
    //     history(`/`);
    // };
    return (

        <>
            <div>
                <h4>Facturación</h4>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">Nombre de la empresa:</label>
                        <input placeholder='Nombre de la empresa' onChange={handleChange} defaultValue={form.name_company} name="name_company" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">NIT:</label>
                        <input placeholder='NIT' onChange={handleChange} defaultValue={form.nit} name="nit" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">Tipo de empresa:</label>
                        <select onChange={handleChange} defaultValue={form.type_company} name="type_company" class="form-control" >
                            <option value=""></option>
                            <option value="Privada">Privada</option>
                            <option value="Publica">Publica</option>
                            <option value="Mixta">Mixta</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">Estado factura:</label>
                        <select onChange={handleChange} defaultValue={form.state} name="state" class="form-control">
                            <option value=""></option>
                            <option value="Pendiente pago">Pendiente pago</option>
                            <option value="Pagado">Pagado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">Medio de pago</label>
                        <select onChange={handleChange} defaultValue={form.payment_method} name="payment_method" class="form-control">
                            <option value=""></option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Debito">Debito</option>
                            <option value="Credito">Credito</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">Valor de factura:</label>
                        <input placeholder='Valor de factura' defaultValue={form.bill_value} name="bill_value" class="form-control" />
                    </div>
                    <button class="btn btn-primary" type='submit'>Enviar</button>
                </form>
            </div>
            <div>

            </div>
        </>
    )
}

export default Factura