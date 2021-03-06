const axios = require("axios");
const api_key = require("./../config.json").api_key;

async function submit(payload){
    return new Promise( (resolve, reject) => {
    //   curl --data \
    //   '{"api_key":[CW_API_KEY],
    //     "url":[AUDIO_FILE_URL],
    //         "title":[TRANSCRIPT_TITLE],
    //         "names":[ARRAY_OF_SPEAKER_NAMES],
    //         "notes":[SOME_NOTES],
    //         "tags":"Interview"
    //    }' \
    //   test - Creates a test only order that will not be transcribed.
    //   notes - text feild with comments for the transcribers about this audio
    //   names -  a synonym for name
    const api = "https://castingwords.com/store/API4/order_url";
    let body = payload;
    body.api_key = api_key;
    body.tags = "Interview";
    if(process.env.NODE_ENV!="production") {
        body.test = 1;
        // prevent bug in names field.
        delete body['names'];
        console.log('body["names"] was delete in development mode.');
    }
    console.log(body);
    axios.post(api, body)
        .then( (response) => {
            console.log(response.data);
            resolve(response.data);
        })
        .catch( (error) => {
            // console.log(error.response.data);
            reject(error.response.data);
        });
    });
}

async function listJobs() {
    // curl https://castingwords.com/store/API4/audiofile/[AUDIO_FILE_ID]?api_key=[CW_API_KEY] \
    //     -H "Content-Type: application/json"
}

module.exports = {
    submit
}