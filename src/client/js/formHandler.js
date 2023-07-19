async function handleSubmit(event) {
    event.preventDefault()
    
    // check what text was put into the form field
    const data = {
        formData: document.getElementById('name').value
    }

    // input handling if someone enters numbers
    var hasNumber = /\d/;
    if (hasNumber.test(data.formData)) {
        document.getElementById("results").innerHTML = "Please don't enter numbers";
        res.send("Numbers can't be in input");
    }
    
    console.log("::: Form Submitted :::")

    // go to server to get the details of the API
    let APIDetails = await postData('/postData', data);
   

    // the following code was adapted from the API documentation
    const formdata = new FormData();
    formdata.append("key", APIDetails.apiKey);
    formdata.append("txt", APIDetails.text);
    formdata.append("lang", "en");

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const APIresponse = await fetch(APIDetails.baseURL, requestOptions);
    const APIUseful = await APIresponse.json();


    // update the UI
    document.getElementById("results").innerHTML = `Irony = ${APIUseful.irony}, Confidence = ${APIUseful.confidence}, Subjectivity = ${APIUseful.subjectivity}`;
    
}


// function to post the data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        
        const APIDetails = await response.json();
        return APIDetails;

    } catch (error) {
        console.log('error', error);
    }
}

export { handleSubmit }
