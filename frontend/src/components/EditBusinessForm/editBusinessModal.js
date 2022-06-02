import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBusinessForm from "./index";

function EditBusinessFormModal() {

  const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)}>Edit</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditBusinessForm />
          </Modal>
        )}
      </>
    );
  }

  export default EditBusinessFormModal;
