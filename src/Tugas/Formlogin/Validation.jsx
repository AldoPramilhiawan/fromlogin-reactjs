import React from "react";
const Input = ({ label, name, type, placeholder, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <br />
      <Input type={type} name={name} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      <br />
    </div>
  );
};

const ShowErrors = ({ errors }) => {
  return (
    <ul style={{ color: "red", marginLeft: "-20px" }}>
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};

class Validation extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    let message = [];
    if (email.length === 0) {
      message = [...message, "Email tidak boleh kosong"];
    }

    if (password.length === 0) {
      message = [...message, "Password tidak boleh kosong"];
    }

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(email).toLowerCase())) {
      message = [...message, "Email tidak valid"];
    }

    if (password.length < 8) {
      message = [...message, "Password terlalu pendek"];
    }

    if (message.length > 0) {
      this.setState({
        errors: message,
      });
    } else {
      alert(`
      email: ${this.state.email}
      password: ${this.state.password}
      `);
      this.setState({
        errors: []
      })
      
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="login">
          <div class="avatar">
            <i class="fa fa-user"></i>
          </div>
          {this.state.errors && <ShowErrors errors={this.state.errors} />}

          <h2>Login Form</h2>

          <div class="box-login">
            <i class="fas fa-envelope-open-text"></i>
            <input type="email" label="Email" placeholder="Email" onChange={(value) => this.setState({ email: value })} />
          </div>

          <div class="box-login">
            <i class="fas fa-lock"></i>
            <input type="password" label="Password" placeholder="Password" onChange={(value) => this.setState({ password: value })} />
          </div>

          <button type="submit" name="login" class="btn-login">
            Login
          </button>
          <div class="bottom">
            <a href="#">Register</a>
            <a href="#">Forgot Password</a>
          </div>
        </div>
      </form>
    );
  }
}

export default Validation;
