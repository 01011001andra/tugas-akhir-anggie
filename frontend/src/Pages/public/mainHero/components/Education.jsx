import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getEducations } from "../../../../services/education.service";

export default function Educations() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null); // 🔥 modal data

  // =======================
  // HELPERS
  // =======================
  const getImageSrc = (base64) => {
    if (!base64) return null;
    if (base64.startsWith("data:image")) return base64;
    return `data:image/png;base64,${base64}`;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  // =======================
  // FETCH EDUCATIONS
  // =======================
  const fetchEducations = async () => {
    try {
      setLoading(true);
      const res = await getEducations();
      const list = Array.isArray(res.data) ? res.data : res.data?.results || [];
      setEducations(list);
    } catch (e) {
      console.error("Fetch educations error:", e);
      setEducations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  // =======================
  // UI
  // =======================
  return (
    <>
      <main className="container mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 flex justify-center items-center gap-2">
            <Icon icon="mdi:school-outline" />
            Edukasi
          </h1>
          <p className="opacity-70">
            Artikel & pembelajaran seputar vertikultur dan lingkungan
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : educations.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <Icon
              icon="mdi:book-open-page-variant-outline"
              className="text-6xl opacity-30 mb-4"
            />
            <p className="text-lg opacity-60">Belum ada konten edukasi</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {educations.map((edu) => (
              <div
                key={edu.id}
                onClick={() => setSelectedEdu(edu)}
                className="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer"
              >
                {/* IMAGE */}
                {getImageSrc(edu.image) ? (
                  <figure className="h-48 overflow-hidden">
                    <img
                      src={getImageSrc(edu.image)}
                      alt={edu.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                ) : (
                  <div className="h-48 bg-base-300 flex items-center justify-center">
                    <Icon
                      icon="mdi:image-off-outline"
                      className="text-4xl opacity-40"
                    />
                  </div>
                )}

                {/* BODY */}
                <div className="card-body">
                  <h2 className="card-title line-clamp-2">{edu.title}</h2>

                  <p className="text-sm opacity-70 line-clamp-3">
                    {edu.content}
                  </p>

                  <div className="flex justify-between items-center mt-4 text-xs opacity-60">
                    <span>{formatDate(edu.createdAt)}</span>
                    <span>By Admin</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* =======================
          FULLSCREEN MODAL
      ======================= */}
      {selectedEdu && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-7xl  w-screen h-screen rounded-none p-0">
            {/* HEADER */}
            <div className="sticky top-0 z-10 bg-base-100 border-b px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{selectedEdu.title}</h2>
                <p className="text-sm opacity-60">
                  {formatDate(selectedEdu.createdAt)} · By Admin
                </p>
              </div>

              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedEdu(null)}
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto p-6 max-h-[calc(100vh-80px)]">
              {getImageSrc(selectedEdu.image) && (
                <img
                  src={getImageSrc(selectedEdu.image)}
                  alt={selectedEdu.title}
                  className="w-full max-h-[400px] object-contain rounded-lg mb-6"
                />
              )}

              <article className="prose max-w-none">
                <p className="whitespace-pre-line">{selectedEdu.content}</p>
              </article>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
