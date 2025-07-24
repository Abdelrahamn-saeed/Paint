import React from 'react';

export function DeleteButton({ handleDelete, shapes }) {
    return (
        <button
            onClick={handleDelete}
            disabled={shapes.length <= 0}
            style={{ opacity: shapes.length > 0 ? 1 : 0.4 }}
            className="deleteAll"
        >
            <i className="fa-regular fa-trash-can"></i><p>Delete</p>
        </button>
    );
}

export default DeleteButton;