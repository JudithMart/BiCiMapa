
import { registerUser, loginUser, logoutUser, getCurrentUser } from './services/auth.service';

function App() {

// Registrar usuario
const handleRegister = async () => {
  // Datos de prueba
  const email = 'aguimtz.2003@gmail.com';
  const password = 'password123';

  // Intentar login primero
  const loginResult = await loginUser(email, password);
  if (loginResult.user) {
    alert('El usuario ya está registrado.');
    return;
  }

  // Si el login falla, intentar registrar
  const { user, error } = await registerUser(email, password);
  console.log('Respuesta de Supabase al registrar:', { user, error });
  if (error) {
    alert('Error al registrar: ' + error.message);
  } else {
    alert('Registro exitoso');
  }
};
// Iniciar sesión
const handleLogin = async () => {
  const { user, error } = await loginUser('aguimtz.2003@gmail.com', 'password123');
  console.log('Login:', user, error);
};

// Cerrar sesión
const handleLogout = async () => {
  const { error } = await logoutUser();
  console.log('Logout:', error);
};

// Obtener usuario actual
const handleGetUser = async () => {
  const { user, error } = await getCurrentUser();
  console.log('Usuario actual:', user, error);
};

  return (
    <div className='bg-yellow-400 min-h-screen flex flex-col items-center justify-center gap-4'>
      <h1>Test Supabase</h1>
      <button onClick={handleRegister} className="px-4 py-2 bg-blue-500 text-white rounded">Registrar usuario</button>
      <button onClick={handleLogin} className="px-4 py-2 bg-green-500 text-white rounded">Iniciar sesión</button>
      <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Cerrar sesión</button>
      <button onClick={handleGetUser} className="px-4 py-2 bg-gray-700 text-white rounded">Obtener usuario actual</button>
      <p className="mt-4 text-sm text-gray-700">Revisa la consola para ver los resultados.</p>
    </div>
  )
}

export default App
