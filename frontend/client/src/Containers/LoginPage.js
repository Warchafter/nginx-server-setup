import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from 'hoc/Layout/DefaultLayout';
import { Navigate } from 'react-router-dom';
import { resetRegistered, login } from 'features/user';
import { Loader } from 'Components/Loader';

import 'Containers/css/LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
	const { loading, isAuthenticated, registered } = useSelector(state => state.user);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

    useEffect(() => {
        if(registered) dispatch(resetRegistered());
    }, [registered]);

	const { email, password } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();

		dispatch(login({ email, password }));
        // Make sure to pass this as 1 parameter (as an object {})
	};

    if (isAuthenticated) {return <Navigate to='/dashboard' />}

    return (
        <DefaultLayout title='Auth Site | Login' content='Login Page'>
        <div className='center-wrapper'>
            <div className='center-box modal-style1'>
                {loading ?
                    <Loader />
                    :
                    <>
                        <h1>Login into your Account</h1>
                        <form onSubmit={onSubmit}>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='form-label-style'>
                                        Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    onChange={onChange}
                                    value={email}
                                    required
                                    className='form-input-style1'
                                />
                            </div>
                            <div className='form-field-spacing'>
                                <label
                                    htmlFor='password'
                                    className='form-label-style'>
                                        Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    onChange={onChange}
                                    value={password}
                                    required
                                    className='form-input-style1'
                                />
                            </div>
                            {loading ? <Loader />  : <button>Login</button>}
                        </form>
                    </>
                }
            </div>
        </div>
        </DefaultLayout>
    );
}

export default LoginPage;