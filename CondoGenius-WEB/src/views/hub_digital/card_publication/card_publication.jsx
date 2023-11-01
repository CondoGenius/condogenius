import { Formik } from 'formik';
import React from "react";
import { AiFillPushpin, AiOutlinePushpin, AiOutlineSend } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import Tooltip from "../../../components/tooltip/tooltip";
import ErrorField from '../../../components/utils/errorField';
import useHubDigital from "../../../states/hub_diigtal/hooks/useHubDigital";
import { VerifyQuantityDays } from "../../../utils/utils";

import './card_publication.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const CommentSchema = Yup.object().shape({
    description: Yup.string().ensure().required(requiredFieldMessage),
});

const renderSurvey = (survey, userId, voteSurvey) => {

    const setPorcent = (value) => {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = value + '%';
    };

    const submitVote = async (option) => {
        const response = await voteSurvey({values: {userId, surveyId: survey.id, option}});

        if (response?.status === 201) {
            toast.success("Voto recebido com sucesso.");
        }
    };

    return (
      <div>
        <div className="survey_question_content">
            {survey.question}
        </div>
        <div>
            {survey.options.map(option => (
                <div onClick={submitVote(option.value)}>
                    <span>{option.value}</span>
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
    const user = useSelector((state => state.user.data));

    const { getPublications, createComment, updatePublication, voteSurvey, deletePublication, deleteComment } = useHubDigital();

    const submitFixedPost = async (e) => {
        e.preventDefault();
        const response = await updatePublication(publication.id);

        if (response.status === 200) {
            toast.success("Fixação alterada com sucesso");
            getPublications();
        }
    };

    const submitDeletePost = async (e) => {
        e.preventDefault();
        const response = await deletePublication(publication.id);

        if (response.status === 200) {
            toast.success("Publicação removida com sucesso.");
            getPublications();
        }
    };

    const submitDeleteComment = async (e) => {
        e.preventDefault();
        const response = await deleteComment(publication.id);

        if (response.status === 200) {
            toast.success("Comentário removido com sucesso.");
            getPublications();
        }
    };

    return (
    <div className="publication_content">
        <div className="user_info">
            <div className="name_info">
                <BsPersonCircle />{`${publication.name} ${publication.last_name}`}
                <div className="day_info">
                    {VerifyQuantityDays(publication.createdAt)}
                </div>
            </div>
            <div className='actions_publication'>
                <div className="fixed_info">
                    {publication.fixed && <AiFillPushpin className="pin_icon" onClick={(e) => isAdmin && submitFixedPost(e)}/>}
                    {!publication.fixed && isAdmin && 
                        <Tooltip message={"Fixar publicação"}>
                            <AiOutlinePushpin className="pin_icon" onClick={(e) => submitFixedPost(e)}/>
                        </Tooltip>
                    }
                </div>
                <div className="delete_icon">
                    {publication.user_id === user.id && 
                    <Tooltip message={"Remover publicação"}>
                        <ImBin className="bin_icon" onClick={(e) => submitDeletePost(e)}/>
                    </Tooltip>
                    }
                </div>
            </div>
        </div>
        <div className="publication_info">
            {publication.survey ? renderSurvey(publication.survey, user.id, voteSurvey) : publication.content}
        </div>
        <div className="action_comment">
            <Formik        
                initialValues={{
                    userId: user.id,
                    postId: publication.id,
                    description: ''
                }}
                validationSchema={CommentSchema}
                onSubmit={async (values, {resetForm}) =>{
                    const response = await createComment(values);

                    if (response?.status === 201) {
                        toast.success("Comentário publicado com sucesso.");
                        resetForm();
                        getPublications();
                    }
                }}
            > 
            {({
                handleChange,
                values,
                handleSubmit,
                handleReset,
                isValid,
                errors
            }) => (
                <>
                    <span>
                        <input 
                            id="description"
                            type="text" 
                            placeholder="Adicione um comentário"
                            onChange={handleChange}
                            value={values.description}
                        />
                        {errors.description && <ErrorField error={errors.description}/>}
                    </span>
                    <Tooltip message={"Publicar comentário"}>
                        <AiOutlineSend onClick={handleSubmit}/>
                    </Tooltip>
                </>
            )}
            </Formik>
        </div>

        {publication.comments?.map(comment => (
            <div className="comment_content">
                <div className="user_info">
                    <div className="name_info">
                        <BsPersonCircle />{`${publication.name} ${publication.last_name}`}
                        <div className="day_info">
                            {VerifyQuantityDays(comment.createdAt)}
                        </div>
                    </div>
                    <div className="delete_icon">
                        {comment.user_id === user.id && 
                        <Tooltip message={"Remover publicação"}>
                            <ImBin className="bin_icon" onClick={(e) => submitDeleteComment(e)}/>
                        </Tooltip>
                        }
                    </div>
                </div>
                <div className="publication_info">
                    {comment.content}
                </div>
            </div>
        ))}
        </div>
    )
};

export default CardPublication;