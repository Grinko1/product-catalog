import { SubmitHandler, useForm } from 'react-hook-form';
import style from './LoginForm.module.scss';
import { AuthData } from 'types';
import { memo } from 'react';

export interface IFormInput {
  username: string;
  password: string;
}

interface LoginFormProps {
  userData: AuthData;
  onChange: (valye: AuthData) => void;
  submit: () => void;
  error?: string;
}

const LoginForm = (props: LoginFormProps) => {
  const { userData, onChange, submit, error } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = () => {
    submit();
  };

  return (
    <div>
      <form className={style.LoginForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('username', { required: true, minLength: 5 })}
          aria-invalid={errors.username ? 'true' : 'false'}
          placeholder='Username'
          value={userData.username}
          onChange={(e) => onChange({ ...userData, username: e.target.value })}
        />
        {errors.username?.type === 'required' && (
          <span className={style.FormError} role='alert'>
            *Username is required
          </span>
        )}

        <input
          {...register('password', { required: true, minLength: 5 })}
          aria-invalid={errors.password ? 'true' : 'false'}
          placeholder='Password'
          value={userData.password}
          onChange={(e) => onChange({ ...userData, password: e.target.value })}
          type='password'
        />
        {errors.password?.type === 'required' && (
          <span className={style.FormError} role='alert'>
            *Password is required
          </span>
        )}
        {error && <span className={style.FormError}>{error}</span>}
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default memo(LoginForm);
