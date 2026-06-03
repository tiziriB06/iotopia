import React, { useState } from "react";
import "./cours.css";

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const PenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

function CoursPage() {
    const [newCourse, setNewCourse] = useState({ name: "", link: "", description: "" });
    const [courseToDelete, setCourseToDelete] = useState({ name: "", link: "", description: "" });
    const [courseToModify, setCourseToModify] = useState({ name: "", link: "", description: "" });

    const handleAddCourse = () => console.log("Adding course:", newCourse);
    const handleDeleteCourse = () => console.log("Deleting course:", courseToDelete);
    const handleModifyCourse = () => console.log("Modifying course:", courseToModify);

    return (
        <div className="courspage-wrapper-xzf">
            <div className="iot-bg-efg">{/* optional IoT background */}</div>

            {/* Ajouter */}
            <div className="section-head-xkl">
                <div className="icon-text-dsk">
                    <div className="circle-icon-opl"><PlusIcon /></div>
                    <h2>Ajouter un nouveau cours</h2>
                </div>
                <button className="btn-action-zzz" onClick={handleAddCourse}>
                    <span className="icon-check-vbn"><CheckIcon /></span> Ajouter cour
                </button>
            </div>

            <div className="xzf-form-wrapper">
                <div className="ujk-input-box">
                    <div className="abc-input-group">
                        <label>Nom du cours :</label>
                        <input type="text" className="form-ttt" value={newCourse.name}
                            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                            placeholder="Nom du cours" />
                    </div>
                    <div className="abc-input-group">
                        <label>Lien vers le cours :</label>
                        <input type="text" className="form-ttt" value={newCourse.link}
                            onChange={(e) => setNewCourse({ ...newCourse, link: e.target.value })}
                            placeholder="https://..." />
                    </div>
                </div>

                <div className="rtx-desc-block">
                    <div className="desc-head-mmm">
                        <label>Description :</label>
                        <span className="char-count-yui">{newCourse.description.length}/1000</span>
                    </div>
                    <textarea className="area-txt-qwe" maxLength={1000}
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        placeholder="Décrivez le cours ici..." />
                </div>
            </div>

            {/* Supprimer */}
            <div className="section-head-xkl section-gap">
                <div className="icon-text-dsk">
                    <div className="circle-icon-opl"><TrashIcon /></div>
                    <h2>Supprimer un cours</h2>
                </div>
                <button className="btn-action-zzz" onClick={handleDeleteCourse}>
                    <span className="icon-check-vbn"><CheckIcon /></span> Supprimer cours
                </button>
            </div>

            <div className="xzf-form-wrapper">
                <div className="ujk-input-box">
                    <div className="abc-input-group">
                        <label>Nom du cours :</label>
                        <input type="text" className="form-ttt" value={courseToDelete.name}
                            onChange={(e) => setCourseToDelete({ ...courseToDelete, name: e.target.value })}
                            placeholder="Nom du cours" />
                    </div>
                    <div className="abc-input-group">
                        <label>Lien vers le cours :</label>
                        <input type="text" className="form-ttt" value={courseToDelete.link}
                            onChange={(e) => setCourseToDelete({ ...courseToDelete, link: e.target.value })}
                            placeholder="https://..." />
                    </div>
                </div>

                <div className="rtx-desc-block">
                    <div className="desc-head-mmm">
                        <label>Description :</label>
                        <span className="char-count-yui">{courseToDelete.description.length}/1000</span>
                    </div>
                    <textarea className="area-txt-qwe" maxLength={1000}
                        value={courseToDelete.description}
                        onChange={(e) => setCourseToDelete({ ...courseToDelete, description: e.target.value })}
                        placeholder="Description..." />
                </div>
            </div>

            {/* Modifier */}
            <div className="section-head-xkl section-gap">
                <div className="icon-text-dsk">
                    <div className="circle-icon-opl"><PenIcon /></div>
                    <h2>Modifier un cours</h2>
                </div>
                <button className="btn-action-zzz" onClick={handleModifyCourse}>
                    <span className="icon-check-vbn"><CheckIcon /></span> Modifier cour
                </button>
            </div>

            <div className="xzf-form-wrapper">
                <div className="ujk-input-box">
                    <div className="abc-input-group">
                        <label>Nom du cours :</label>
                        <input type="text" className="form-ttt" value={courseToModify.name}
                            onChange={(e) => setCourseToModify({ ...courseToModify, name: e.target.value })}
                            placeholder="Nom du cours" />
                    </div>
                    <div className="abc-input-group">
                        <label>Lien vers le cours :</label>
                        <input type="text" className="form-ttt" value={courseToModify.link}
                            onChange={(e) => setCourseToModify({ ...courseToModify, link: e.target.value })}
                            placeholder="https://..." />
                    </div>
                </div>

                <div className="rtx-desc-block">
                    <div className="desc-head-mmm">
                        <label>Description :</label>
                        <span className="char-count-yui">{courseToModify.description.length}/1000</span>
                    </div>
                    <textarea className="area-txt-qwe" maxLength={1000}
                        value={courseToModify.description}
                        onChange={(e) => setCourseToModify({ ...courseToModify, description: e.target.value })}
                        placeholder="Description..." />
                </div>
            </div>
        </div>
    );
}

export default CoursPage;
