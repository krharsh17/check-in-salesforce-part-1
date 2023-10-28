import { oauth, net } from 'react-native-force';

const findLeadByEmail = (email, successCallback, errorCallback) => {
    net.query(`SELECT Email FROM Lead WHERE Email = '${email}'`,
        (response) => {
            successCallback(response.records.length > 0);
        },
        (error) => errorCallback('Failed to query:', error)
    );
}

const createLeadObject = (leadData, successCallback, errorCallback) => {
    net.create('Lead', leadData, () => {
        successCallback()
    }, (error) => {
        errorCallback(error)
    })
}

const getAllLeads = (successCallback, errorCallback) => {
    net.query(`SELECT Email,FirstName,LastName,Company FROM Lead`,
        (response) => {
            successCallback(response.records);
        },
        (error) => errorCallback('Failed to query:' + error)
    );
}

export const checkIfLeadExists = (email, successCallback, errorCallback) => {
    oauth.getAuthCredentials(
        () => findLeadByEmail(email, successCallback, errorCallback), // already logged in
        () => {
            oauth.authenticate(
                () => findLeadByEmail(email, successCallback, errorCallback),
                (error) => console.log('Failed to authenticate:' + error)
            );
        });
}

export const createLead = (leadData, successCallback, errorCallback) => {
    oauth.getAuthCredentials(
        () => createLeadObject(leadData, successCallback, errorCallback), // already logged in
        () => {
            oauth.authenticate(
                () => createLeadObject(leadData, successCallback, errorCallback),
                (error) => console.log('Failed to authenticate:' + error)
            );
        });
}

export const fetchLeads = (successCallback, errorCallback) => {
    oauth.getAuthCredentials(
        () => getAllLeads(successCallback, errorCallback), // already logged in
        () => {
            oauth.authenticate(
                () => getAllLeads(successCallback, errorCallback),
                (error) => console.log('Failed to authenticate:' + error)
            );
        });
}