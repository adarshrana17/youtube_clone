// import { Link } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// function SignUp() {
//     const [sidebar, setSidebar] = useState(false);
//     const [formData, setFormData] = useState({
//         fullName: "",
//         email: "",
//         password: "",
//         dob: "",
//         mobile: "",
//         profileImage: null,
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setFormData({ ...formData, profileImage: file });
//     };

//     const validateForm = () => {
//         let newErrors = {};
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const mobileRegex = /^[0-9]{10}$/;

//         if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
//         if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = "Valid Email is required";
//         if (!formData.password.trim() || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
//         if (!formData.dob) newErrors.dob = "Date of Birth is required";
//         if (!formData.mobile.trim() || !mobileRegex.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit phone number";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (validateForm()) {
//             await handleRegister();
//         }
//     };

//     const handleRegister = async () => {
//         const userData = {
//             fullName: formData.fullName,
//             email: formData.email,
//             password: formData.password,
//             dateOfBirth: formData.dob,
//             mobile: formData.mobile
//         };
    
//         try {
//             const response = await fetch("http://localhost:5100/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" }, // ✅ Important!
//                 body: JSON.stringify(userData) // ✅ Convert to JSON string
//             });
    
//             const result = await response.json();
//             if (response.ok) {
//                 alert("Registered Successfully");
//             } else {
//                 alert(result.message || "Registration failed");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Something went wrong!");
//         }
//     };
    

//     return (
//         <>
//         <Header setSidebar={setSidebar} sidebar={sidebar} />
//         {sidebar && <Sidebar />}
//         <div className="flex h-screen justify-center items-center bg-gray-100">
//             <form onSubmit={handleSubmit} className="flex flex-col rounded shadow-2xl bg-white justify-center items-center p-2.5 py-5 gap-5">
//                 <p className="text-center text-3xl font-bold text-blue-600 m-3">Registration Form</p>

//                 <div className="flex flex-row gap-10 px-5">
//                     <div className="left flex flex-col gap-3">
//                         <label htmlFor="name" className="label-text">Full Name <span className="text-red-600 text-[15px]">*</span></label>
//                         <input type="text" name="fullName" placeholder="Enter your full name" id="name" value={formData.fullName} onChange={handleChange} className="inp-btn" />
//                         {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

//                         <label htmlFor="email" className="label-text">Email <span className="text-red-600 text-[15px]">*</span></label>
//                         <input type="email" name="email" placeholder="Enter your email" id="email" value={formData.email} onChange={handleChange} className="inp-btn" />
//                         {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//                         <label htmlFor="password" className="label-text">Password <span className="text-red-600 text-[15px]">*</span></label>
//                         <input type="password" name="password" placeholder="Enter your password" id="password" value={formData.password} onChange={handleChange} className="inp-btn" />
//                         {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//                     </div>

//                     <div className="right flex flex-col gap-3">
//                         <label htmlFor="dob" className="label-text">Date of Birth <span className="text-red-600 text-[15px]">*</span></label>
//                         <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} className="inp-btn pr-5" />
//                         {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

//                         <label htmlFor="mobile" className="label-text">Phone Number <span className="text-red-600 text-[15px]">*</span></label>
//                         <input type="text" name="mobile" placeholder="Mobile number" id="mobile" value={formData.mobile} onChange={handleChange} className="inp-btn" />
//                         {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

//                         <label htmlFor="profileImage" className="label-text">Profile Image</label>
//                         <input type="file" id="profileImage" name="profileImage" accept="image/*" onChange={handleImageChange} className="inp-btn" />
//                         {formData.profileImage && <p className="text-sm text-gray-600">{formData.profileImage.name}</p>}
//                     </div>
//                 </div>

//                 <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 text-xl rounded w-[95%]">Register</button>
//                 <p className="text-center text-gray-600">Already have an account? <Link to="/signin" className="text-blue-600 font-semibold hover:underline">Login</Link></p>
//             </form>
//         </div>
//         </>
//     );
// }

// export default SignUp;



import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [sidebar, setSidebar] = useState(false);
    const nevigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        dob: "",
        mobile: "",
        profileImage: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
    };

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = "Valid Email is required";
        if (!formData.password.trim() || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.dob) newErrors.dob = "Date of Birth is required";
        if (!formData.mobile.trim() || !mobileRegex.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit phone number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            await handleRegister();
        }
    };

    const handleRegister = async () => {
        const userData = new FormData();
userData.append("fullName", formData.fullName);
userData.append("email", formData.email);
userData.append("password", formData.password);
userData.append("dateOfBirth", formData.dob);
userData.append("mobile", formData.mobile);

if (formData.profileImage) {
    userData.append("profileImage", formData.profileImage);
}

    
        try {
            const response = await fetch("http://localhost:5100/register", {
                method: "POST",
                body: userData, // Send FormData instead of JSON
            });
    
            const result = await response.json();
            if (response.ok) {
                alert("Registered Successfully");
                nevigate("/signin");
            } else {
                alert(result.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };
    
    
    return (
        <>
        <Header setSidebar={setSidebar} sidebar={sidebar} />
        {sidebar && <Sidebar />}
        <div className="flex min-h-screen justify-center items-center bg-gray-100 p-4 mt-15">
            <form onSubmit={handleSubmit} className="flex flex-col rounded shadow-2xl bg-white justify-center items-center p-5 gap-5 w-full max-w-3xl">
                <p className="text-center text-3xl font-bold text-blue-600 m-3">Registration Form</p>

                <div className="flex flex-col md:flex-row gap-10 w-full">
                    <div className="left flex flex-col gap-3 w-full md:w-1/2">
                        <label htmlFor="name" className="label-text">Full Name <span className="text-red-600 text-[15px]">*</span></label>
                        <input type="text" name="fullName" placeholder="Enter your full name" id="name" value={formData.fullName} onChange={handleChange} className="inp-btn" />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

                        <label htmlFor="email" className="label-text">Email <span className="text-red-600 text-[15px]">*</span></label>
                        <input type="email" name="email" placeholder="Enter your email" id="email" value={formData.email} onChange={handleChange} className="inp-btn" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <label htmlFor="password" className="label-text">Password <span className="text-red-600 text-[15px]">*</span></label>
                        <input type="password" name="password" placeholder="Enter your password" id="password" value={formData.password} onChange={handleChange} className="inp-btn" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="right flex flex-col gap-3 w-full md:w-1/2">
                        <label htmlFor="dob" className="label-text">Date of Birth <span className="text-red-600 text-[15px]">*</span></label>
                        <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} className="inp-btn pr-5" />
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

                        <label htmlFor="mobile" className="label-text">Phone Number <span className="text-red-600 text-[15px]">*</span></label>
                        <input type="text" name="mobile" placeholder="Mobile number" id="mobile" value={formData.mobile} onChange={handleChange} className="inp-btn" />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

                        <label htmlFor="profileImage" className="label-text">Profile Image</label>
                        <input type="file" id="profileImage" name="profileImage" accept="image/*" onChange={handleImageChange} className="inp-btn" />
                        {formData.profileImage && <p className="text-sm text-gray-600">{formData.profileImage.name}</p>}
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 text-xl rounded w-full">Register</button>
                <p className="text-center text-gray-600">Already have an account? <Link to="/signin" className="text-blue-600 font-semibold hover:underline">Login</Link></p>
            </form>
        </div>
        </>
    );
}

export default SignUp;
