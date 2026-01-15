function Register() {
    return (
        <div>
            <h2>Register Page</h2>
            <form>
                <input placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />

                <select>
                    <option>User</option>
                    <option>Organizer</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;