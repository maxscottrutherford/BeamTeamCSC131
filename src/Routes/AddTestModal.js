import React, { useState } from "react";

const Modal = ({ closeModal, onSave, rowData }) => {
    const [formState, setFormState] = useState(rowData || {
        TestID: '',
        OrgAssignment: '',
        TestName: '',
        TestMethod: '',
        Notes: '',
        Completed: false,
        UpdatedBy: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSave = () => {
        onSave(formState);
    };

    return (
        <div className="modal-container">
            <div className="modal">
                <form>
                    <div className="form-group">
                        <label htmlFor="TestID">ID</label>
                        <input
                            name="TestID"
                            onChange={handleChange}
                            value={formState.TestID}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="OrgAssignment">Org Assignment</label>
                        <input
                            name="OrgAssignment"
                            onChange={handleChange}
                            value={formState.OrgAssignment}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="TestName">Name</label>
                        <input
                            name="TestName"
                            onChange={handleChange}
                            value={formState.TestName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="TestMethod">Method</label>
                        <input
                            name="TestMethod"
                            onChange={handleChange}
                            value={formState.TestMethod}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Notes">Notes</label>
                        <textarea
                            name="Notes"
                            onChange={handleChange}
                            value={formState.Notes}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Completed">Completed</label>
                        <input
                            type="checkbox"
                            name="Completed"
                            checked={formState.Completed}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    Completed: e.target.checked,
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="UpdatedBy">Updated By</label>
                        <input
                            name="UpdatedBy"
                            onChange={handleChange}
                            value={formState.UpdatedBy}
                        />
                    </div>
                    <button type="button" onClick={handleSave}>
                        Save
                    </button>
                    <button type="button" onClick={closeModal}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
