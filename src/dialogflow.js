import { SessionsClient } from '@google-cloud/dialogflow';
import { project_id, private_key as _private_key, client_email as _client_email } from './configs-dialogflow.json';

const sessionClient = new SessionsClient({
    projectId: project_id, credentials: {
        private_key: _private_key,
        client_email: _client_email
    }
});

async function dfSendMessage(chatId, message){
    const sessionPath = sessionClient.projectAgentSessionPath(project_id, chatId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'pt-BR'
            }
        }
    }

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return {
        text: result.fulfillmentText,
        intent: result.intent.displayName,
        fields: result.parameters.fields
    };
};

export default dfSendMessage;