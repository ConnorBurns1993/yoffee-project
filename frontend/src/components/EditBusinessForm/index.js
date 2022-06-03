import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBusinessForm from "./EditBusinessForm";

function EditBusinessFormModal() {

  const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)}>How?</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditBusinessForm />
          </Modal>
        )}
      </>
    );
  }

  export default EditBusinessFormModal;
