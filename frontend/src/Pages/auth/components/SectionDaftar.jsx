import imageLeft from "../../../assets/background.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { register } from "../../../services/auth.service";
import { toast } from "react-toastify";

export default function SectionDaftar() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.username || !values.email || !values.password) {
      toast.warning("Semua field harus diisi!");
      return;
    }

    setLoading(true);

    try {
      // Backend butuh: name, email, password
      await register({
        name: values.username,
        email: values.email,
        password: values.password,
      });

      toast.success("Pendaftaran berhasil, silakan login");
      navigate("/Masuk");
    } catch (err) {
      // Error sudah di-toast oleh interceptor juga,
      // tapi ini aman sebagai fallback
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* KIRI */}
      <div className="w-1/2 hidden md:block">
        <img
          src={imageLeft}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* KANAN */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 px-8">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Selamat datang di <span className="text-green-600">VertiGrow</span>
          </h1>

          <form onSubmit={handleSubmit}>
            {/* NAMA */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                name="username"
                placeholder="Nama anda"
                className="w-full bg-gray-200 py-2 px-3 rounded-lg outline-none"
                onChange={handleChanges}
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email anda"
                className="w-full bg-gray-200 py-2 px-3 rounded-lg outline-none"
                onChange={handleChanges}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Kata Sandi
              </label>
              <div className="flex items-center bg-gray-200 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Kata sandi anda"
                  className="w-full bg-transparent py-2 px-3 outline-none"
                  onChange={handleChanges}
                />
                <span
                  onClick={togglePassword}
                  className="px-3 cursor-pointer text-gray-500"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg text-lg hover:bg-green-700"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                  Memproses...
                </>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Sudah punya akun?{" "}
            <a href="/Masuk" className="text-orange-600 font-medium">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
