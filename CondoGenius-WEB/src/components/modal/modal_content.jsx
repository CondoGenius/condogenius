import React from "react";

import { Modal, Button } from "react-materialize";

import './modal_content.scss';

const ModalContent = ({header, trigger, children, action}) => {
    return (
        <Modal
            header={header}
            trigger={trigger}
            actions={[
                <div>
                    <Button flat modal="close" node="button" className="confirm_button">
                        Confirmar
                    </Button>
                    <Button flat modal="close" node="button">
                        Fechar
                    </Button>
                </div>
            ]}
            className={action}
        >
            {children}
        </Modal>
    )
};

export default ModalContent;