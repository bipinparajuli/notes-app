import React from 'react';

import { useGetNoteQuery } from '../../redux/slice';

const NoteDetails: React.FC<{ id: number }> = ({ id }) => {
  const response = useGetNoteQuery(id);
  if (response.isSuccess) {
    return (
      <div className="fixed inset-0 m-20 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-md rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-2 text-xl font-bold">{response?.data?.title}</h2>
          <p className="mb-4 text-gray-700">{response?.data?.content}</p>
        </div>
      </div>
    );
  }
};

export default NoteDetails;
