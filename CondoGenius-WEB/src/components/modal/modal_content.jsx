import React from "react";

import { Button, Modal } from "react-materialize";

import { MdClose } from 'react-icons/md';

import './modal_content.scss';

const ModalContent = ({header, trigger, children, className }) => {
    return (
        <Modal
            header={header}
            trigger={trigger}
            actions={
                <Button flat modal="close" node="button">
                    <MdClose />
                </Button>
            }
        >
            {children}
        </Modal>
    )
};

export default ModalContent;