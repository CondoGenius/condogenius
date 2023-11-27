import { Formik } from 'formik';
import React from "react";
import { AiFillPushpin, AiOutlinePushpin, AiOutlineSend } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { Button } from 'react-materialize';
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

const renderSurvey = (survey, userId, voteSurvey, getPublications) => {

    const submitVote = async (option) => {
        const response = await voteSurvey({userId, surveyId: survey.id, option});

        if (response?.status === 201) {
            toast.success("Voto recebido com sucesso");
        }
        
        getPublications();
    };

    return (
      <div className='survey_content'>
        <div className="survey_question_content">
            {survey.content}
        </div>
        <div className='options_content'>
            {survey.options.map(option => (
                <div className="option_content">
                    <span>{option.title}</span>
                    <div className='progress_button_content'>
                        <div class="progress-container">
                            <div class="progress-bar" id={`progress-bar-${option.id}`} style={{ width: `${option.percentage_of_votes}%` }}>
                                {option.percentage_of_votes !== 0 && <span>{option.percentage_of_votes}%</span>}
                            </div>
                            <div class="percentage" id="percentage" />
                        </div>
                        <div>
                            <Button onClick={() => submitVote(option.id)}>Votar</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>  
    );
};

const CardPublication = ({publication}) => {
    const isAdmin = useSelector((state => state.user.data.isAdmin));
    const user = useSelector((state => state.user.data));

    const { getPublications, getPublicationsByUserId, createComment, fixPublication, voteSurvey, deletePublication, deleteComment } = useHubDigital();

    const submitFixedPost = async (e) => {
        e.preventDefault();
        const response = await fixPublication(publication.id);

        if (response.status === 200) {
            toast.success(response.data.message);
        }
        
        getPublications();
        getPublicationsByUserId(user.id);
    };

    const submitDeletePost = async (e) => {
        e.preventDefault();
        const response = await deletePublication(publication.id);

        if (response.status === 200) {
            toast.success("Publicação removida com sucesso.");
        }
        
        getPublications();
        getPublicationsByUserId(user.id);
    };

    const submitDeleteComment = async (e, comment_id) => {
        e.preventDefault();

        const response = await deleteComment(comment_id);

        if (response.status === 200) {
            toast.success("Comentário removido com sucesso.");
        }
        
        getPublications();
        getPublicationsByUserId(user.id);
    };

    return (
    <div className="publication_content">
        <div className="user_info">
            <div className="name_info">
                <BsPersonCircle />{`${publication.user.name} ${publication.user.last_name}`}
                <div className="day_info">
                    {VerifyQuantityDays(publication.createdAt)}
                </div>
            </div>
            <div className='actions_publication'>
                <div className="fixed_info">
                    {publication.fixed && <AiFillPushpin className="pin_icon" onClick={(e) => isAdmin && submitFixedPost(e)}/>}
                    {!publication.fixed && isAdmin && 
                        <Tooltip message="Fixar publicação">
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
            {Object.keys(publication.poll).length ? renderSurvey(publication.poll, user.id, voteSurvey, getPublications) : publication.content}
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
                    let comment = {
                        userId: user.id,
                        postId: publication.id,
                        description: values.description
                    }

                    const response = await createComment(comment);

                    if (response?.status === 201) {
                        toast.success("Comentário publicado com sucesso.");
                        resetForm();
                    }
                    
                    getPublications();
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

        {publication.comments?.map(coment => (
            <div className="comment_content">
                <div className="user_info">
                    <div className="name_info">
                        <BsPersonCircle />{`${coment.user.name} ${coment.user.last_name}`}
                        <div className="day_info">
                            {VerifyQuantityDays(coment.createdAt)}
                        </div>
                    </div>
                    <div className="delete_icon">
                        {coment.user_id === user.id && 
                        <Tooltip message={"Remover comentário"}>
                            <ImBin className="bin_icon" onClick={(e) => submitDeleteComment(e, coment.id)}/>
                        </Tooltip>
                        }
                    </div>
                </div>
                <div className="publication_info">
                    {coment.content}
                </div>
            </div>
        ))}
        </div>
    )
};

export default CardPublication;