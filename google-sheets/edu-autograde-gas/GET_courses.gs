function getCourses() {
    const token = ScriptApp.getOAuthToken();
    const url = "https://classroom.googleapis.com/v1/courses";

    const response = UrlFetchApp.fetch(url, {
        headers: {
            Authorization: "Bearer " + token,
        },
        muteHttpExceptions: true,
    });

    Logger.log(response.getContentText());
}