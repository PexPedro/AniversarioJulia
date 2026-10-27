'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const endpoint = isRegistering ? '/api/register' : '/api/login';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Login automático: deu certo, vai direto para as fotos!
      router.push('/surpresa');
    } else {
      setMessage({ text: data.error || 'Ops, algo deu errado! 💔', type: 'error' });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-rose-50">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm text-center border-2 border-rose-100">
        <h1 className="text-2xl font-bold text-rose-600 mb-2">
          {isRegistering ? 'Junte-se à Festa! 🎈' : 'Acesso Especial 💌'}
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          {isRegistering ? 'Crie sua conta para ver a surpresa de aniversário!' : 'Entre para celebrar com a gente!'}
        </p>

        {message.text && (
          <p className={`mb-4 text-sm font-medium ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message.text}
          </p>
        )}

        <input
          type="text"
          placeholder="Seu usuário"
          className="w-full p-3 border border-rose-200 rounded-xl mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={isRegistering ? 'Crie uma senha' : 'Sua senha secreta'}
          className="w-full p-3 border border-rose-200 rounded-xl mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-rose-500 text-white p-3 rounded-xl font-bold hover:bg-rose-600 transition-all shadow-md hover:shadow-lg mb-4">
          {isRegistering ? 'Criar Conta 🎉' : 'Entrar ❤️'}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setMessage({ text: '', type: '' });
          }}
          className="text-rose-400 text-sm font-semibold hover:text-rose-600 transition underline"
        >
          {isRegistering ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Crie uma!'}
        </button>
      </form>
    </div>
  );
}