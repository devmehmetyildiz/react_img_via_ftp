import axios from 'axios'
import React from 'react'
import Employee from './Employee'

export default function EmployeeList() {
    const employeeAPI = (url = "http://localhost:34891/api/File/Add") => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
    const addOrEdit = (formData, onSuccess) => {
        employeeAPI().create(formData).then(response => {
            console.log('response: ', response);
            console.log("basarılı")
            onSuccess();
        }) .catch(error => {
            console.log('erroraxios: ', error);
        })
       /*  axios({
            method: 'post',
            url: `http://localhost:34891/api/File/Add`,
            data: formData
        })
            .then(response => {
                console.log('response: ', response);
                console.log("basarılı")
                onSuccess();
            })
            .catch(error => {
                console.log('erroraxios: ', error);
            }) */
    }
    return (
        <div className="row">
            <div className='col-md-12'>
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Employee Register</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <Employee addOrEdit={addOrEdit} />
            </div>
            <div className="col-md-8">
                <div>List of Employee</div>
            </div>
        </div>
    )
}
