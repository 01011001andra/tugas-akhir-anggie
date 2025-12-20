import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  createEducation,
  getEducations,
  updateEducation,
  deleteEducation,
} from "@/services/education.service";
import { fileToBase64 } from "../../utils/helper";

export default function AdminEducations() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "", // base64
  });

  // =======================
  // FETCH
  // =======================
  const fetchEducations = async () => {
    try {
      setLoading(true);
      const res = await getEducations();
      setEducations(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  // =======================
  // SAVE (CREATE / UPDATE)
  // =======================
  const handleSave = async () => {
    if (!form.title || !form.content) {
      alert("Judul dan konten wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        content: form.content,
        image: form.image || null,
      };

      if (editingId) {
        await updateEducation(editingId, payload);
      } else {
        await createEducation(payload);
      }

      await fetchEducations();
      resetForm();
      setShowModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // EDIT
  // =======================
  const handleEdit = (edu) => {
    setForm({
      title: edu.title,
      content: edu.content,
      image: edu.image || "",
    });
    setEditingId(edu.id);
    setShowModal(true);
  };

  // =======================
  // DELETE
  // =======================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus education ini?")) return;

    try {
      setLoading(true);
      await deleteEducation(id);
      await fetchEducations();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      image: "",
    });
    setEditingId(null);
  };

  // =======================
  // IMAGE PICK (BASE64)
  // =======================
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, image: base64 }));
  };

  return (
    <div className="flex min-h-screen bg-base-100">
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <Icon icon="mdi:school" className="inline mr-2" />
              Education
            </h1>
            <p>Total: {educations.length} data</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <Icon icon="mdi:plus" />
            Tambah Education
          </button>
        </div>

        {/* Table */}
        <div className="card bg-base-200 shadow">
          <table className="table">
            <thead>
              <tr>
                <th>Education</th>
                <th>Konten</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-8">
                    <span className="loading loading-spinner mr-2" />
                    Memuat data...
                  </td>
                </tr>
              ) : educations.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="mb-4 rounded-full bg-base-300 p-4">
                        <Icon
                          icon="mdi:school-outline"
                          className="text-4xl text-base-content/60"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        Belum ada education
                      </h3>
                      <p className="text-sm text-base-content/60 mb-4">
                        Tambahkan education pertama
                      </p>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        <Icon icon="mdi:plus" className="mr-1" />
                        Tambah Education
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                educations.map((edu) => (
                  <tr key={edu.id}>
                    <td>
                      <div className="flex gap-3 items-center">
                        {edu.image ? (
                          <img
                            src={edu.image}
                            className="w-12 h-12 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded bg-base-300 flex items-center justify-center">
                            <Icon
                              icon="mdi:image-off-outline"
                              className="text-xl text-base-content/40"
                            />
                          </div>
                        )}
                        <span className="font-semibold">{edu.title}</span>
                      </div>
                    </td>
                    <td className="max-w-xs truncate">{edu.content}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(edu)}
                        className="btn btn-sm btn-ghost text-blue-500"
                      >
                        <Icon icon="mdi:pencil" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu.id)}
                        className="btn btn-sm btn-ghost text-red-500"
                      >
                        <Icon icon="mdi:trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-lg">
              <h3 className="font-bold text-lg mb-4">
                {editingId ? "Edit Education" : "Tambah Education"}
              </h3>

              <div className="space-y-3">
                <input
                  className="input input-bordered w-full"
                  placeholder="Judul Education"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Konten Education"
                  rows={5}
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />

                {form.image && (
                  <img
                    src={form.image}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
              </div>

              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Batal
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
