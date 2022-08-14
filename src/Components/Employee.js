import React, { useState, useEffect } from 'react'

const defaultImageSrc = '/img/user.png'

const initialfieldvalues = {
    employeeId: 0,
    employeeName: "",
    occupation: '',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function Employee() {
    const [values, setValues] = useState(initialfieldvalues)
    const [errors, setErrors] = useState({})
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader()
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile: imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        } else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }
    const validate = () => {
        let temp = {}
        temp.employeeName = values.employeeName == "" ? false : true
        temp.imgSrc = values.imageSrc == defaultImageSrc ? false : true
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {

        }
    }
    const applyerrorclass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')
    return (
        <>
            <div className='container text-center'>
                <p className='lead'>empoyee form</p>
            </div>
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className='card'>
                    <div className='card-body'>
                        <img style={{ margin: '10px', width: '200px', height: '200px' }} src={values.imageSrc} className="card-img-top" />
                        <div className='form-group'>
                            <input className={"form-control-file" + applyerrorclass('imgSrc')} accept='image/*' type="file"
                                onChange={showPreview}
                            />
                        </div>
                        <div className='form-group'>
                            <input className={"form-control" + applyerrorclass('employeeName')} placeholder='Employee Name' name='employeeName'
                                value={values.employeeName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input className='form-control' placeholder='Occupation' name='occupation'
                                value={values.occupation}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group text-center'>
                            <button type='submit' className='btn btn-light'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
