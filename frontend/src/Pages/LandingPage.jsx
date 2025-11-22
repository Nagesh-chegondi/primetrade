import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BACKEND_URI;
const LandingPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ⭐ Handle Input Change (Option-2)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ⭐ Combined Signup + Signin Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(API)
    const url = isSignup
      ? `${API}/auth/signup`
      : `${API}/auth/signin`;

    const body = isSignup
      ? formData // name + email + password
      : { email: formData.email, password: formData.password }; // only email + password

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!isSignup) {
      if (res.ok) {
        localStorage.setItem("token", data.token)
        navigate('/dashboard')
      }
      else{
        alert(data.message||"signin failed")
      }
    }
    else{
      if(res.ok){
       alert('User signed up successfully! Click OK to login.');
      // Redirect to login form after alert
      setIsSignup(false);
      }
      else{
        alert(data.message||"signup failed")
    }
    }
    console.log(isSignup ? "Signup Response:" : "Signin Response:", data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#f5f5f5] font-sans">
      {/* LEFT SIDE CONTENT */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#222] p-10 text-center text-white md:text-left">
        <h1 className="mb-[10px] text-[32px] md:text-[40px]">Welcome!</h1>
        <p className="text-[16px] md:text-[18px] opacity-70">
          Create an account or login to continue.
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex flex-1 flex-col justify-center bg-white p-[30px] md:p-[40px] shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-left">{isSignup ? "Create Account" : "Sign In"}</h2>

        <form onSubmit={handleSubmit} className="mt-[20px] flex flex-col">

          {/* NAME - only for signup */}
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mb-[15px] rounded-[5px] border border-[#bbb] p-[12px] text-[16px] outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-[15px] rounded-[5px] border border-[#bbb] p-[12px] text-[16px] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-[15px] rounded-[5px] border border-[#bbb] p-[12px] text-[16px] outline-none"
          />

          <button type="submit" className="cursor-pointer rounded-[5px] border-none bg-[#0066ff] p-[12px] text-[16px] text-white transition duration-200 hover:bg-blue-600">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* SWITCH FORM LINK */}
        <p className="mt-[15px] text-center md:text-left">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}

          <span
            className="ml-[5px] cursor-pointer font-bold text-[#0066ff] hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Signup"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
