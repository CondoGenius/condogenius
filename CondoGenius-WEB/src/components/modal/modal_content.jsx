import React from "react";

import { Button, Modal } from "react-materialize";

import { MdClose } from 'react-icons/md';

import './modal_content.scss';

const ModalContent = ({header, trigger, children }) => {
    return (
        <Modal
            header={header}
            trigger={trigger}
            actions={
                <Button flat modal="close" node="button" className="close_button_modal">
                    <MdClose />
                </Button>
            }
        >
            {children}
        </Modal>
    )
};

export default ModalContent;