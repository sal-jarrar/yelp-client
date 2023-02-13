import { useMutation } from "@apollo/client";
import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { DELETE_CAMP } from "../graphql/campground/Mutation";
import { useNavigate } from "react-router";
import { GET_CAMPGROUND, GET_CAMPGROUNDS } from "../graphql/campground/Query";

type ModalProps = {
  show: boolean;
  handleClose: () => void;
  campId: number;
};

function DeleteCampModal({ show, handleClose, campId }: ModalProps) {
  const navigate = useNavigate();
  const [deleteCamp, { data, loading, error }] = useMutation(DELETE_CAMP, {
    update() {
      setTimeout(() => {
        navigate("/campgrounds");
        handleClose();
      }, 1000);
    },

    refetchQueries: [
      { query: GET_CAMPGROUND, variables: { campId } },
      { query: GET_CAMPGROUNDS },
    ],
  });

  return (
    <>
      {data && <Alert variant="danger">Succesfully Delete</Alert>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-delete-header" closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-delete-body">
          Woohoo, you're reading this text in a modal!
        </Modal.Body>
        <Modal.Footer className="modal-delete-footer">
          <Button
            variant="outline-warning"
            onClick={() => deleteCamp({ variables: { campId } })}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCampModal;
