import { Button } from '../ui/button';

type IProps = {
  closeModal: () => void;
  handleDelete: () => void;
};

const DeleteModel: React.FC<IProps> = ({ closeModal, handleDelete }) => {
  return (
    <div className="fixed inset-0 m-20 flex items-center justify-center">
      <div className="rounded bg-white p-4 shadow-md">
        <p className="mb-4">Are you sure you want to delete the note?</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
