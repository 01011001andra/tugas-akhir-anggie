import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "@/services/user.service";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // =======================
  // FETCH USERS
  // =======================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =======================
  // SAVE (CREATE / UPDATE)
  // =======================
  const handleSave = async () => {
    if (!form.name || !form.email || (!editingId && !form.password)) {
      alert("Lengkapi semua field");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await updateUser(editingId, {
          name: form.name,
          email: form.email,
        });
      } else {
        await createUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }

      await fetchUsers();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // EDIT
  // =======================
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
    setEditingId(user.id);
    setShowModal(true);
  };

  // =======================
  // DELETE
  // =======================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;

    try {
      setLoading(true);
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
    });
    setEditingId(null);
  };

  return (
    <div className="flex min-h-screen bg-base-100">
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-base-900 mb-2">
              <Icon icon="mdi:people" className="inline-block mr-2" />
              Kelola User
            </h1>
            <p className="text-base-600">Total: {users.length} user</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            <Icon icon="mdi:plus" />
            Tambah User
          </button>
        </div>

        {/* Table */}
        <div className="card bg-base-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-300">
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  users?.data?.map((user) => (
                    <tr key={user.id} className="hover:bg-base-300">
                      <td className="font-semibold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="btn btn-sm btn-ghost text-blue-500"
                          >
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-sm btn-ghost text-red-500"
                          >
                            <Icon icon="mdi:trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box w-full max-w-md">
              <h3 className="font-bold text-lg mb-4">
                {editingId ? "Edit User" : "Tambah User Baru"}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                {!editingId && (
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                )}
              </div>

              <div className="modal-action mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {editingId ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
