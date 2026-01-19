import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // ✅ MUST be here

  const handleSubmit = (e) => {
    e.preventDefault();

    // after successful login
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
