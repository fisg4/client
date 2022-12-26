// component for displaying a single user info (username, email, role and plan) in react
function User(user) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text">Role: {user.role}</p>
                <p className="card-text">Plan: {user.plan}</p>
            </div>
        </div>
    );
}

export default User;