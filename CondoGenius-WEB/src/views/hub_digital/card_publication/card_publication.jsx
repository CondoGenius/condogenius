import React from "react";
import { AiFillPushpin, AiOutlinePushpin, AiOutlineSend } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { VerifyQuantityDays } from "../../../utils/utils";

import './card_publication.scss';


const renderSurvey = (survey) => {

    const setPorcent = (value) => {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = value + '%';
    }

    return (
      <div>
        <div className="survey_question_content">
            {survey.question}
        </div>
        <div>
            {survey.options.map(option => (
                <div>
                    <span>{option}</span>
                    <div class="progress-container">
                        <div class="progress-bar" id="progress-bar" />
                        <div class="percentage" id="percentage"/>
                    </div>
                    {setPorcent(option.quantity_votes)}
                </div>
            ))}
        </div>
      </div>  
    );
};

const CardPublication = ({publication}) => {
    const isAdmin = useSelector((state => state.user.data.isAdmin));

    return (
    <div className="publication_content">
        <div className="user_info">
            <div className="name_info">
                <BsPersonCircle />{`${publication.name} ${publication.last_name}`}
                <div className="day_info">
                    {VerifyQuantityDays(publication.date)}
                </div>
            </div>
            <div className="fixed_info">
                {publication.is_fixed && <AiFillPushpin className="pin_icon"/>}
                {!publication.is_fixed && isAdmin && <AiOutlinePushpin className="pin_icon"/>}
            </div>
        </div>
        <div className="publication_info">
            {publication.type === 'enquete' ? publication.description : renderSurvey(publication.survey)}
        </div>
        <div className="action_comment">
            <input type="text" placeholder="Adicione um comentário"/><AiOutlineSend />
        </div>
        <div className="coments_info">
        {publication.comments.map(comment => (
            <div className="comment_content">
                <span className="user_info_comment">
                    <BsPersonCircle />`${comment.user_name} ${comment.user_last_name}`
                    <div className="day_info">
                        {VerifyQuantityDays(comment.date)}
                    </div>
                </span>
                <span className="comment">
                    {comment.description}
                </span>
            </div>
        ))}
        </div>
    </div>
    )

};

export default CardPublication;