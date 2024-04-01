import { useState } from 'react';
import DefaultLayout from 'hoc/Layout/DefaultLayout';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from 'features/user';
import { Loader } from 'Components/Loader';

const RegisterPage = () => {
    const dispatch = useDispatch();
	const { registered, loading } = useSelector(state => state.user);

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
        re_password: '',
	});

	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();

		dispatch(register({ first_name, last_name, email, password, re_password }));
	};

	if (registered) return <Navigate to='/login' />;

    return (
        <DefaultLayout title='Auth Site | Register' content='Register Page'>
            <h1>Register for an Account</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='first_name'>First Name</label>
                    <input
                        type='text'
                        name='first_name'
                        onChange={onChange}
                        value={first_name}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='last_name'>Last Name</label>
                    <input
                        type='text'
                        name='last_name'
                        onChange={onChange}
                        value={last_name}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        onChange={onChange}
                        value={email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        onChange={onChange}
                        value={password}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='re_password'>Re Password</label>
                    <input
                        type='password'
                        name='re_password'
                        onChange={onChange}
                        value={re_password}
                        required
                    />
                </div>
                {loading ? <Loader /> : <button>Register</button>}
            </form>
        </DefaultLayout>
    );
}

export default RegisterPage;