import React from "react";
import { AiFillPushpin, AiOutlinePushpin, AiOutlineSend } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

import './card_publication.scss';

const CardPublication = ({publication}) => {
    const isAdmin = useSelector((state => state.user.data.isAdmin));

    return (
    <div className="publication_content">
        <div className="user_info">
            <div className="name_info">
                <BsPersonCircle />{`${publication.name} ${publication.last_name}`}
                <div className="day_info">
                    {publication.day === 0 && `hoje`}
                    {publication.day === 1 && `há ${publication.day} dia`}
                    {publication.day > 1 && `há ${publication.day} dias`}
                </div>
            </div>
            <div className="fixed_info">
                {publication.isFixed && <AiFillPushpin className="pin_icon"/>}
                {!publication.isFixed && isAdmin && <AiOutlinePushpin className="pin_icon"/>}
            </div>
        </div>
        <div className="publication_info">
            {publication.description}
        </div>
        <div className="action_comment">
            <input type="text" placeholder="Adicione um comentário"/><AiOutlineSend />
        </div>
        <div className="coments_info">
        {publication.comments.map(comment => (
            <div className="comment_content">
                <span className="user_info_comment">
                    <BsPersonCircle />{comment.user_name}
                </span>
                <span className="comment">
                    {comment.comment}
                </span>
            </div>
        ))}
        </div>
    </div>
    )

};

export default CardPublication;