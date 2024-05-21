// production code here
const {BatchClient,SubmitJobCommand} = require('@aws-sdk/client-batch');
const client = new BatchClient();

exports.handler = async (event) => {
    const { schemaId, documentId } = event.data;
    
    const jobDefinition = process.env.JOB_DEFINITION;
    const jobQueue = process.env.JOB_QUEUE;
    const jobNameSufix = process.env.JOB_NAME_SUFFIX
    
    console.log(schemaId,documentId);

    let client = new BatchClient({region:"eu-central-1"});
    var params = {
        jobDefinition,
        jobName: jobDefinition + "-" + jobNameSufix, 
        jobQueue,
        containerOverrides: {
            environment: [
                {
                    name: 'DOCUMENT_ID',
                    value: documentId
                },
                {
                    name: 'SCHEMA_ID',
                    value: schemaId
                }
            ]
        }
    };
    const command = new SubmitJobCommand(params);
    console.log(await client.send(command));
}
