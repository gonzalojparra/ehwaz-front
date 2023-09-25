import useSWR from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import axios from '@/lib/axios';

export const useAuth = ({ middleware, redirectIfAuthenticated }) => {
  const router = useRouter();
  let searchParams = useSearchParams();
  let permissions = [];

  /* Se define una constante data, con destructuring de user, error y mutate del useSWR.
   * El hook useSWR recibe dos parámetros: el primero es la ruta de la API que consume
   * y el segundo es la función que fetchea los datos.
  */
  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error;

        router.push('/verify-email');
      }),
  );

  const get_permissions = async()=>{
    axios
      .get('/api/permissions')
      .then(res => {
        return res.data
      })
      .catch(error => {
        return error
      })
  } 

  /* useEffect(() => {
    if (middleware === 'auth') {
      // Ta logueado
      error && logout()
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        router.push('/');
      }
    } else {
      // No ta logueado
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        router.push('/');
      }
    }
    if (middleware === 'auth' && error) {
      logout()
    }
  }, [user, error]); */

 /*  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated)
    }
    if (
      window.location.pathname === '/verify-email' &&
      user?.email_verified_at
    ) {
      router.push(redirectIfAuthenticated)
    }
    if (middleware === 'auth' && error) {
      logout()
    }
  }, [user, error]); */

  const csrf = async () => axios.get('/sanctum/csrf-cookie');

  const register = async (args) => {
    const { setErrors, ...props } = args;

    await csrf();
    setErrors([]);

    axios
      .post('/register', props)
      .then(() => mutate())
      .then(() => router.push('/'))
      .catch(error => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
  }

  const login = async (args) => {
    const { setErrors, setStatus, ...props } = args;

    await csrf();
    setErrors([]);
    setStatus(null);
    console.log(props);

    axios
      .post('/login', props)
      .then(() => mutate())
      .then(() => router.push('/'))
      .catch(error => {
        if (error) {
          console.log(error.response);
        }
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
  }

  const forgotPassword = async (args) => {
    const { setErrors, setStatus, ...props } = args;

    await csrf();
    setErrors([]);
    setStatus(null);

    axios
      .post('/forgot-password', { token: searchParams.get('token'), ...props })
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status))
      )
      .catch(error => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
  }

  const resetPassword = async (args) => {
    const { setErrors, setStatus, ...props } = args;

    await csrf();
    setErrors([]);
    setStatus(null);

    axios
      .post('/reset-password', { token: searchParams.get('token'), ...props })
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
  }

  const resendEmailVerification = (args) => {
    const { setStatus } = args;

    axios
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status));
  }


  const logout = async () => {
    if (!error) {
      await axios.post('/logout')
        .then(() => console.log('deslogueando'))
        .then(() => mutate());
    }
    router.push('/login');
    window.location.reload();
  }

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    csrf,
    get_permissions,
    permissions
  }
}