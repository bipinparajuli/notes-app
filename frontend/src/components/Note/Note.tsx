import React from 'react';
import { FaTrash, FaPenToSquare } from 'react-icons/fa6';

type IProps = {
  title: string;
  id: number;
  onUpdateClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  getNote: (id: number) => void;
};

const Note: React.FC<IProps> = ({
  title,
  id,
  onUpdateClick,
  onDeleteClick,
  getNote,
}) => {
  return (
    <div
      onClick={() => getNote(id)}
      className="mb-6 flex justify-around rounded bg-white p-4 shadow-md hover:bg-slate-100"
    >
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>

      <div
        className="cursor-pointer"
        data-testid="update-icon"
        onClick={(e) => {
          e.stopPropagation();
          onUpdateClick(id);
        }}
      >
        <FaPenToSquare />
      </div>
      <div
        className="cursor-pointer"
        data-testid="delete-icon"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(id);
        }}
      >
        <FaTrash />
      </div>
    </div>
  );
};

export default Note;
