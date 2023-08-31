import React from "react";

import { Modal, Button } from "react-materialize";

import { MdClose } from 'react-icons/md'

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
            className={className}
        >
            {children}
        </Modal>
    )
};

export default ModalContent;