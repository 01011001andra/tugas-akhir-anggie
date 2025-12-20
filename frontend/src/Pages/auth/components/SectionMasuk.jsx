import imageLeft from "../../../assets/background.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../../services/auth.service";

export default function SectionMasuk() {
  const [values, setValues] = useState({
    email: "admin@gmail.com",
    password: "admin123",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      setErrorMessage("Email dan password tidak boleh kosong!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await login(values);

      localStorage.setItem("accessToken", res.data.tokens.access.token);
      localStorage.setItem("refreshToken", res.data.tokens.refresh.token);

      navigate("/admin/dashboard");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT IMAGE */}
      <div className="hidden md:block">
        <img
          src={imageLeft}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-base-200 px-6">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center">
              Welcome to <span className="text-success">VertiGrow</span>
            </h2>

            {/* ERROR */}
            {errorMessage && (
              <div className="alert alert-error mt-4">
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* EMAIL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChanges}
                  className="input input-bordered"
                />
              </div>

              {/* PASSWORD */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kata Sandi</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChanges}
                    className="input input-bordered w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-success w-full mt-4 text-white"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              Tidak punya akun?{" "}
              <a href="/Daftar" className="link link-warning font-semibold">
                Daftar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
