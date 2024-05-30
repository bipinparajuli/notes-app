import { INote } from '@/types/note.type';
import { NoteForm } from '../NoteForm/NoteForm';
import DeleteModel from '@/components/Model/DeleteModel';
import NoteDetails from '@/components/Model/NoteDetailsModel';

type IProps = {
  modalType: string;
  closeModal: () => void;
  handleDelete: () => void;
  onSubmit: (data: INote, id?: number) => void;
  noteId: number;
};

const ModalContent = ({
  modalType,
  closeModal,
  handleDelete,
  onSubmit,
  noteId,
}: IProps) => {
  switch (modalType) {
    case 'create':
      return <NoteForm onSubmit={onSubmit} title="Add Note" />;
    case 'update':
      return <NoteForm onSubmit={onSubmit} title="Update Note" id={noteId} />;
    case 'noteDetails':
      return <NoteDetails id={noteId} />;
    case 'delete':
      return (
        <DeleteModel closeModal={closeModal} handleDelete={handleDelete} />
      );
    default:
      return null;
  }
};

export default ModalContent;
