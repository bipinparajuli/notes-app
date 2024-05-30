'use client';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

import {
  useDeleteNoteMutation,
  useListNoteQuery,
  usePostNoteMutation,
  useUpdateNoteMutation,
} from '@/redux/slice';
import { INote } from '@/types/note.type';
import Note from '@/components/Note/Note';
import { customStyles } from '@/constants/const';
import { Button } from '@/components/ui/button';
import ModalContent from '@/components/Model/ModelContent';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [noteId, setNoteId] = useState(0);
  const [modalType, setModalType] = useState('');
  const [showModel, setShowModel] = useState(false);

  const [deleteNote] = useDeleteNoteMutation();
  const [update] = useUpdateNoteMutation();
  const [create] = usePostNoteMutation();
  const response = useListNoteQuery();

  const onUpdateClick = (id: number) => {
    setShowModel(true);
    setNoteId(id);
    setModalType('update');
  };

  const onDeleteClick = (id: number) => {
    setShowModel(true);
    setNoteId(id);
    setModalType('delete');
  };

  const getNote = (id: number) => {
    setShowModel(true);
    setNoteId(id);
    setModalType('noteDetails');
  };

  const onCreateClick = () => {
    setShowModel(true);
    setModalType('create');
  };

  const closeModal = () => {
    setShowModel(false);
    setNoteId(0);
    setModalType('');
  };

  const onSubmit = (data: INote, id?: number) => {
    if (id) {
      update({
        id: id,
        title: data.title,
        content: data.content,
      });
    } else {
      create({
        title: data.title,
        content: data.content,
      });
    }

    closeModal();
  };

  const handleDelete = () => {
    setShowModel(false);
    deleteNote(noteId);
    closeModal();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="sticky top-0 mb-4 flex justify-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold mr-6">Note List</h1>
        <Button onClick={onCreateClick}>Create Note</Button>
      </header>
      {response?.data && response?.data?.length > 0 ? (
        response?.data?.map((note) => (
          <Note
            key={note.id}
            onUpdateClick={() => onUpdateClick(note.id)}
            onDeleteClick={() => onDeleteClick(note.id)}
            getNote={() => getNote(note.id)}
            {...note}
          />
        ))
      ) : (
        <div className="flex justify-center">
          <p>No note found</p>
        </div>
      )}
      <Modal
        isOpen={showModel}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="z-50 cursor-pointer" onClick={() => closeModal()}>
          <FaCircleXmark />
        </div>
        <ModalContent
          modalType={modalType}
          closeModal={closeModal}
          handleDelete={handleDelete}
          onSubmit={onSubmit}
          noteId={noteId}
        />
      </Modal>
    </div>
  );
}
