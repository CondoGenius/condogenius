import { useState } from 'react';
import { useDispatch } from "react-redux";
import HubDigitalService from '../../../services/hub_digital/service';
import { setMyPublicationsActions, setPublicationsActions } from '../../../store/hub_digital/actions';

const useHubDigital = () => {
    const dispatch = useDispatch();
    const [loadingHubDigital, setLoadingHubDigital] = useState(false);

    const getPublications = async () => {
        setLoadingHubDigital(true);

        const response = await HubDigitalService().getPublications();
        
        if (response?.status === 200) {
            dispatch(setPublicationsActions({ publications: response.data }));
        } else {
            dispatch(setPublicationsActions({ error: "Erro ao listar publicações."}));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const getPublicationsByUserId = async (userId) => {
        setLoadingHubDigital(true);

        const response = await HubDigitalService().getPublicationsByUserId(userId);
 
        if (response?.status === 200) {
            dispatch(setMyPublicationsActions({ myPublications: response.data }));
        } else {
            dispatch(setMyPublicationsActions({ error: "Erro ao listar suas publicações."}));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const createPublication = async (values) => {
        setLoadingHubDigital(true);

        const post = {
            user_id: values.userId,
            content: values.description,
        };

        const response = await HubDigitalService().createPublication(post);

        if (response?.status !== 201) {
            dispatch(setPublicationsActions({ error: "Erro ao publicar post." }));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const createSurvey = async (values) => {
        setLoadingHubDigital(true);
        console.log('create survey')
        console.log(values)
        const survey = {
            user_id: values.userId,
            content: values.description,
            options: values.inputOptionsValues.filter(value => value !== '')
        };

        const response = await HubDigitalService().createSurvey(survey);

        if (response?.status !== 201) {
            dispatch(setPublicationsActions({ error: "Erro ao publicar post." }));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const createComment = async (values) => {
        setLoadingHubDigital(true);

        const comment = {
            user_id: values.userId,
            post_id: values.postId,
            content: values.description,
        };

        const response = await HubDigitalService().createComment(comment);

        if (response?.status !== 201) {
            dispatch(setPublicationsActions({ error: "Erro ao publicar comentário." }));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const fixPublication = async (postId) => {
        setLoadingHubDigital(true);

        const response = await HubDigitalService().fixPublication(postId);

        if (response?.status !== 200) {
            dispatch(setPublicationsActions({ error: "Erro ao fixar post." }));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const voteSurvey = async (values) => {
        setLoadingHubDigital(true);

        const vote = {
            user_id: values.userId,
            survey_id: values.surveyId,
            poll_option_id: values.option,
        };

        const response = await HubDigitalService().voteSurvey(vote);

        if (response?.status !== 201) {
            dispatch(setPublicationsActions({ error: "Erro ao votar." }));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const deletePublication = async (id) => {
        setLoadingHubDigital(false);

        const response = await HubDigitalService().deletePublication(id);

        if (response?.status !== 200) {
            dispatch(setPublicationsActions({ error: "Erro ao deletar publicação."}));
        }
        
        setLoadingHubDigital(false);
        return response;
    };

    const deleteComment = async (id) => {
        setLoadingHubDigital(false);

        const response = await HubDigitalService().deleteComment(id);

        if (response?.status !== 200) {
            dispatch(setPublicationsActions({ error: "Erro ao deletar comentário."}));
        }
        
        setLoadingHubDigital(false);
        return response;
    };
    

    return {
        loadingHubDigital,
        getPublications,
        getPublicationsByUserId,
        createPublication,
        createSurvey,
        createComment,
        fixPublication,
        voteSurvey,
        deletePublication,
        deleteComment
    };

};

export default useHubDigital;